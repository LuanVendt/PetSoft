"use client";

import { usePetContext } from "@/lib/hooks";
import PetFormBtn from "./pet-form-btn";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

type PetFormProps = {
  actionType: "add" | "edit";
  onFormSubmission: () => void;
};

export default function PetForm({
  actionType,
  onFormSubmission,
}: PetFormProps) {
  const { selectedPet, handleAddPet, handleEditPet } = usePetContext();

  return (
    <form
      action={async (formData) => {
        onFormSubmission();

        const petData = {
          name: formData.get("name") as string,
          ownerName: formData.get("ownerName") as string,
          imageUrl: formData.get("imageUrl") as string,
          age: Number(formData.get("age")),
          notes: formData.get("notes") as string,
        };

        actionType === "add"
          ? await handleAddPet(petData)
          : await handleEditPet(selectedPet!.id, petData);
      }}
      className="flex flex-col"
    >
      <div className="space-y-3">
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            name="name"
            maxLength={10}
            required
            defaultValue={actionType === "edit" ? selectedPet?.name : ""}
            placeholder="Name"
          />
        </div>

        <div>
          <Label htmlFor="ownerName">Owner Name</Label>
          <Input
            id="ownerName"
            type="text"
            name="ownerName"
            maxLength={20}
            required
            defaultValue={actionType === "edit" ? selectedPet?.ownerName : ""}
            placeholder="Owner Name"
          />
        </div>

        <div>
          <Label htmlFor="imageUrl">Image Url</Label>
          <Input
            id="imageUrl"
            type="text"
            name="imageUrl"
            defaultValue={actionType === "edit" ? selectedPet?.imageUrl : ""}
            placeholder="Unsplash image URL"
          />
        </div>

        <div>
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            type="number"
            name="age"
            min={0}
            required
            defaultValue={actionType === "edit" ? selectedPet?.age : ""}
            placeholder="Age"
          />
        </div>

        <div>
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            rows={3}
            name="notes"
            defaultValue={actionType === "edit" ? selectedPet?.notes : ""}
            placeholder="Notes"
          />
        </div>
      </div>

      <PetFormBtn actionType={actionType} />
    </form>
  );
}
