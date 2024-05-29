"use client";

import { createContext, useState } from "react";

type TSearchContext = {
  searchText: string;
  handleChangeSearchText: (searchText: string) => void;
};

type SearchContextProviderProps = {
  children: React.ReactNode;
};

export const SearchContext = createContext<TSearchContext | null>(null);

export default function SearchContextProvider({
  children,
}: SearchContextProviderProps) {
  const [searchText, setSearchText] = useState("");

  const handleChangeSearchText = (searchText: string) =>
    setSearchText(searchText);

  return (
    <SearchContext.Provider
      value={{
        handleChangeSearchText,
        searchText,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
