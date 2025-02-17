"use client";

import { Pet, PetContextProviderProps, TPetContext } from "@/lib/types";
import { createContext, useState } from "react";

export const PetContext = createContext<TPetContext | null>(null);

export default function PetContextProvider({
  children,
  data,
}: PetContextProviderProps) {
  // state
  const [pets, setPets] = useState(data);
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  // derived state
  const selectedPet = pets.find((pet) => pet.id === selectedPetId);
  const numberOfPets = pets.length;

  // event handlers / actions
  const handleAddPet = (newPet: Omit<Pet, "id">) => {
    setPets((prev) => [...prev, { id: String(Date.now()), ...newPet }]);
  };

  const handleCheckoutPet = (id: string) => {
    setPets((prev) => prev.filter((pet) => pet.id !== id));
    setSelectedPetId(null);
  };

  const handleChangeSelectedPetId = (id: string) => setSelectedPetId(id);

  return (
    <PetContext.Provider
      value={{
        pets,
        setPets,
        selectedPetId,
        selectedPet,
        handleChangeSelectedPetId,
        handleCheckoutPet,
        handleAddPet,
        numberOfPets,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}
