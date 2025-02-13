"use client";

import { SearchContextProviderProps, TSearchtContext } from "@/lib/types";
import { createContext, useState } from "react";

export const SearchContext = createContext<TSearchtContext | null>(null);

export default function SearchContextProvider({
  children,
}: SearchContextProviderProps) {
  // state
  const [searchQuery, setSearchQuery] = useState("");

  // derived state

  // event handlers / actions
  const handleChangeSearchQuery = (query: string) => setSearchQuery(query);

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        handleChangeSearchQuery,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
