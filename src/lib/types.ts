export type Pet = {
  id: string;
  name: string;
  ownerName: string;
  imageUrl: string;
  age: number;
  notes: string;
};

export type PetListProps = {
  pets: Pet[];
};

export type PetContextProviderProps = {
  children: React.ReactNode;
  data: Pet[];
};

export type TPetContext = {
  pets: Pet[];
  setPets: React.Dispatch<React.SetStateAction<Pet[]>>;
  selectedPetId: string | null;
  selectedPet: Pet | undefined;
  handleChangeSelectedPetId: (id: string) => void;
  handleCheckoutPet: (id: string) => void;
  handleAddPet: (newPet: Omit<Pet, "id">) => void;
  handleEditPet: (id: string, updatedPet: Omit<Pet, "id">) => void;
  numberOfPets: number;
};

export type SearchContextProviderProps = {
  children: React.ReactNode;
};

export type TSearchtContext = {
  searchQuery: string;
  handleChangeSearchQuery: (query: string) => void;
};
