import { Pet } from "@prisma/client";

export type PetEssentials = Omit<Pet, "id" | "createdAt" | "updatedAt">;

export type PetListProps = {
  Pet: Pet[];
};

export type PetContextProviderProps = {
  children: React.ReactNode;
  data: Pet[];
};

export type TPetContext = {
  pets: Pet[];
  selectedPetId: string | null;
  selectedPet: Pet | undefined;
  handleAddPet: (newPet: PetEssentials) => Promise<void>;
  handleEditPet: (id: Pet["id"], updatedPet: PetEssentials) => Promise<void>;
  handleCheckoutPet: (id: Pet["id"]) => Promise<void>;
  handleChangeSelectedPetId: (id: Pet["id"]) => void;
  numberOfPets: number;
};

export type SearchContextProviderProps = {
  children: React.ReactNode;
};

export type TSearchtContext = {
  searchQuery: string;
  handleChangeSearchQuery: (query: string) => void;
};
