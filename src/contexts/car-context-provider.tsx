"use client";

import { TCar } from "@/lib/types";
import { Car } from "@prisma/client";
import { createContext, useOptimistic, useState } from "react";
import { addCar, checkOutCar, editCar } from "@/actions/actions";
import { toast } from "sonner";

type TCarContext = {
  cars: Car[];
  selectedCarId: Car["id"] | null;
  handleChangeSelectedCarId: (id: Car["id"]) => void;
  selectedCar: Car | undefined;
  totalCars: number;
  handleCompleteCar: (id: Car["id"]) => Promise<void>;
  handleEditCar: (carId: Car["id"], car: Omit<TCar, "id">) => Promise<void>;
  handleAddCar: (car: Omit<TCar, "id">) => Promise<void>;
};

type CarContextProviderProps = {
  data: Car[];
  children: React.ReactNode;
};

export const CarContext = createContext<TCarContext | null>(null);

export default function CarContextProvider({
  data: cars,
  children,
}: CarContextProviderProps) {
  const [optimisticPets, setOptimisticPets] = useOptimistic(
    cars,
    (state, { action, data }) => {
      switch (action) {
        case "add":
          return [...state, data];
        case "edit":
          return state.map((car) =>
            car.id === data.id ? { ...car, ...data.editedCar } : car
          );
        case "complete":
          return state.filter((car) => car.id !== data.id);
        default:
          return state;
      }
    }
  );

  const [selectedCarId, setSelectedCarId] = useState<Car["id"] | null>(null);

  const selectedCar = cars.find((car) => car.id === selectedCarId);
  const totalCars = cars.length;

  const handleChangeSelectedCarId = (id: Car["id"]) => setSelectedCarId(id);

  const handleCompleteCar = async (id: Car["id"]) => {
    setOptimisticPets({ action: "complete", data: { id } });
    const error = await checkOutCar(id);
    if (error) {
      toast.warning(error.message);
    }
  };
  const handleAddCar = async (car: Omit<TCar, "id">) => {
    setOptimisticPets({ action: "add", data: car });
    const error = await addCar(car);
    if (error) {
      toast.warning(error.message);
    }
  };
  const handleEditCar = async (
    carId: Car["id"],
    editedCar: Omit<TCar, "id">
  ) => {
    setOptimisticPets({
      action: "edit",
      data: { id: carId, editedCar },
    });
    const error = await editCar(carId, editedCar);
    if (error) {
      toast.warning(error.message);
    }
  };

  return (
    <CarContext.Provider
      value={{
        cars,
        selectedCarId,
        handleChangeSelectedCarId,
        selectedCar,
        totalCars,
        handleCompleteCar,
        handleEditCar,
        handleAddCar,
      }}
    >
      {children}
    </CarContext.Provider>
  );
}
