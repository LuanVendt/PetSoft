"use client";

import { addPet, checkoutPet, editPet } from "@/actions/actions";
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
  const handleAddPet = async (data: Omit<Pet, "id">) => {
    const createdPet = await addPet(data);
    setPets((prev) => [...prev, createdPet]);
  };

  const handleEditPet = async (id: string, data: Omit<Pet, "id">) => {
    const updatedPet = await editPet(id, data);
    setPets((prev) => prev.map((pet) => (pet.id === id ? updatedPet : pet)));
  };

  const handleCheckoutPet = async (id: string) => {
    const deletedPet = await checkoutPet(id);
    setPets((prev) => prev.filter((pet) => pet.id !== deletedPet.id));
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
        handleEditPet,
        numberOfPets,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}
