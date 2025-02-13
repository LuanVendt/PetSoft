"use client";

import { Pet } from "@/lib/types";
import { createContext, useState } from "react";

export const PetContext = createContext(null);

export default function PetContextProvider({
  children,
  data,
}: {
  children: React.ReactNode;
  data: Pet[];
}) {
  const [pets, setPets] = useState(data);
  const [selectedPetId, setSelectedPetId] = useState(null);

  return (
    <PetContext.Provider
      value={{
        pets,
        setPets,
        selectedPetId,
        setSelectedPetId,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}
