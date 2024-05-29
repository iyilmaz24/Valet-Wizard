"use client";

import { Car } from "@/lib/types";
import { createContext, useState } from "react";

type TCarContext = {
  cars: Car[];
  selectedCarId: string | null;
  handleChangeSelectedCarId: (id: string) => void;
  selectedCar: Car | undefined;
  totalCars: number;
  handleCompleteCar: (id: string) => void;
  handleAddCar: (car: Omit<Car, "id">) => void;
  handleEditCar: (carId: string, editedCar: Omit<Car, "id">) => void;
};

type CarContextProviderProps = {
  data: Car[];
  children: React.ReactNode;
};

export const CarContext = createContext<TCarContext | null>(null);

export default function CarContextProvider({
  data,
  children,
}: CarContextProviderProps) {
  const [cars, setCars] = useState(data);
  const [selectedCarId, setSelectedCarId] = useState<string | null>(null);

  const selectedCar = cars.find((car) => car.id === selectedCarId);
  const totalCars = cars.length;

  const handleChangeSelectedCarId = (id: string) => setSelectedCarId(id);

  const handleCompleteCar = (id: string) => {
    setCars((prev) => prev.filter((car) => car.id !== id));
    setSelectedCarId(null);
  };

  const handleAddCar = (newCar: Omit<Car, "id">) => {
    const addedCar = { ...newCar, id: Date.now().toString() };
    setCars((prev) => [...prev, addedCar]);
  };
  const handleEditCar = (carId: string, editedCar: Omit<Car, "id">) => {
    setCars((prev) =>
      prev.map((car) => (car.id === carId ? { id: car.id, ...editedCar } : car))
    );
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
        handleAddCar,
        handleEditCar,
      }}
    >
      {children}
    </CarContext.Provider>
  );
}
