"use client";

import { usePetContext } from "@/lib/hooks";
import { Pet } from "@/lib/types";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

type PetFormProps = {
  actionType: "add" | "edit";
  onFormSubmission: () => void;
};

export default function PetForm({ actionType, onFormSubmission }: PetFormProps) {
  const { handleAddPet } = usePetContext();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const newPet: Omit<Pet, "id"> = {
      name: String(formData.get("name")),
      ownerName: String(formData.get("ownerName")),
      imageUrl:
        String(formData.get("imageUrl")) ||
        "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
      age: Number(formData.get("age")),
      notes: String(formData.get("notes")),
    };

    handleAddPet(newPet);
    
    onFormSubmission();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <div className="space-y-3">
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input id="name" type="text" name="name" required />
        </div>

        <div>
          <Label htmlFor="ownerName">Owner Name</Label>
          <Input id="ownerName" type="text" name="ownerName" required />
        </div>

        <div>
          <Label htmlFor="imageUrl">Image Url</Label>
          <Input id="imageUrl" type="text" name="imageUrl" />
        </div>

        <div>
          <Label htmlFor="age">Age</Label>
          <Input id="age" type="number" name="age" required />
        </div>

        <div>
          <Label htmlFor="notes">Notes</Label>
          <Textarea id="notes" rows={3} name="notes" />
        </div>
      </div>

      <Button type="submit" className="mt-5 self-end">
        {actionType === "add" ? "Add a new pet" : "Edit Pet"}
      </Button>
    </form>
  );
}
