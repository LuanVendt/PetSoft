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
  selectedPetId: string | null;
};
