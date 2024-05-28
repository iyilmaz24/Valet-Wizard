import { useContext } from "react";
import { CarContext } from "@/contexts/car-context-provider";

export default function useCarContext() {
  const context = useContext(CarContext);

  if (!context) {
    throw new Error("useCarContext must be used within a CarContextProvider");
  }

  return context;
}
