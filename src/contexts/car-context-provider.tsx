"use client";

import { Car } from "@/lib/types";
import { createContext, useState } from "react";

type TCarContext = {
  cars: Car[];
  selectedCarId: string | null;
  handleChangeSelectedCarId: (id: string) => void;
  selectedCar: Car | undefined;
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

  const handleChangeSelectedCarId = (id: string) => setSelectedCarId(id);

  return (
    <CarContext.Provider
      value={{
        cars,
        selectedCarId,
        handleChangeSelectedCarId,
        selectedCar,
      }}
    >
      {children}
    </CarContext.Provider>
  );
}
