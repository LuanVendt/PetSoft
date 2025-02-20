"use client";

import { addPet, editPet } from "@/actions/actions";
import { usePetContext } from "@/lib/hooks";
import { toast } from "sonner";
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
  const { selectedPet } = usePetContext();

  return (
    <form
      action={async (formData) => {
        let error: { message: string } | undefined = undefined;

        actionType === "add"
          ? (error = await addPet(formData))
          : (error = await editPet(selectedPet!.id, formData));

        if (error) {
          toast.warning(error.message);
          return;
        }
        onFormSubmission();
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
          />
        </div>

        <div>
          <Label htmlFor="imageUrl">Image Url</Label>
          <Input
            id="imageUrl"
            type="text"
            name="imageUrl"
            defaultValue={actionType === "edit" ? selectedPet?.imageUrl : ""}
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
          />
        </div>

        <div>
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            rows={3}
            name="notes"
            defaultValue={actionType === "edit" ? selectedPet?.notes : ""}
          />
        </div>
      </div>

      <PetFormBtn actionType={actionType} />
    </form>
  );
}
