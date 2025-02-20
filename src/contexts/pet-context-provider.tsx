"use client";

import { addPet, checkoutPet, editPet } from "@/actions/actions";
import { DEFAULT_PET_IMAGE } from "@/lib/constants";
import { Pet, PetContextProviderProps, TPetContext } from "@/lib/types";
import { isValidImageUrl } from "@/lib/utils";
import { createContext, useOptimistic, useState } from "react";
import { toast } from "sonner";

export const PetContext = createContext<TPetContext | null>(null);

type ActionPayload =
  | { action: "add"; payload: Omit<Pet, "id"> }
  | { action: "edit"; payload: { id: string; updatedPet: Omit<Pet, "id"> } }
  | { action: "delete"; payload: string };

export default function PetContextProvider({
  children,
  data: pets,
}: PetContextProviderProps) {
  const [optimisticPets, setOptimisticPets] = useOptimistic(
    pets,
    (state: Pet[], { action, payload }: ActionPayload) => {
      switch (action) {
        case "add":
          return [...state, { ...payload, id: Math.random().toString() }];

        case "edit":
          return state.map((pet) =>
            pet.id === payload.id ? { ...pet, ...payload.updatedPet } : pet
          );

        case "delete":
          return state.filter((pet) => pet.id !== payload);

        default:
          return state;
      }
    }
  );

  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  const selectedPet = optimisticPets.find((pet) => pet.id === selectedPetId);
  const numberOfPets = optimisticPets.length;

  const handleAddPet = async (newPet: Omit<Pet, "id">) => {
    if (!isValidImageUrl(newPet.imageUrl)) newPet.imageUrl = DEFAULT_PET_IMAGE;

    setOptimisticPets({ action: "add", payload: newPet });

    const error = await addPet(newPet);

    if (error) {
      toast.warning(error.message);
      return;
    }
  };

  const handleEditPet = async (id: string, updatedPet: Omit<Pet, "id">) => {
    if (!isValidImageUrl(updatedPet.imageUrl))
      updatedPet.imageUrl = DEFAULT_PET_IMAGE;

    setOptimisticPets({ action: "edit", payload: { id, updatedPet } });

    const error = await editPet(id, updatedPet);

    if (error) {
      toast.warning(error.message);
      return;
    }
  };

  const handleCheckoutPet = async (id: string) => {
    setOptimisticPets({ action: "delete", payload: id });

    const error = await checkoutPet(id);

    if (error) {
      toast.warning(error.message);
      return;
    }
  };

  const handleChangeSelectedPetId = (id: string) => setSelectedPetId(id);

  return (
    <PetContext.Provider
      value={{
        pets: optimisticPets,
        selectedPetId,
        selectedPet,
        handleAddPet,
        handleEditPet,
        handleCheckoutPet,
        handleChangeSelectedPetId,
        numberOfPets,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}
