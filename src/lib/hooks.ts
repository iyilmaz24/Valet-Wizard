import { useContext } from "react";
import { CarContext } from "@/contexts/car-context-provider";
import { SearchContext } from "@/contexts/search-context-provider";

export function useCarContext() {
  const context = useContext(CarContext);

  if (!context) {
    throw new Error("useCarContext must be used within a CarContextProvider");
  }

  return context;
}

export function useSearchContext() {
  const context = useContext(SearchContext);

  if (!context) {
    throw new Error(
      "useSearchContext must be used within a SearchContextProvider"
    );
  }

  return context;
}
