"use client";

import { PetContextProviderProps, TPetContext } from "@/lib/types";
import { createContext, useState } from "react";

export const PetContext = createContext<TPetContext | null>(null);

export default function PetContextProvider({
  children,
  data: pets,
}: PetContextProviderProps) {
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  const selectedPet = pets.find((pet) => pet.id === selectedPetId);
  const numberOfPets = pets.length;

  const handleChangeSelectedPetId = (id: string) => setSelectedPetId(id);

  return (
    <PetContext.Provider
      value={{
        pets,
        selectedPetId,
        selectedPet,
        handleChangeSelectedPetId,
        numberOfPets,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}
