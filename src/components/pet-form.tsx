"use client";

import { DEFAULT_PET_IMAGE } from "@/lib/constants";
import { usePetContext } from "@/lib/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import PetFormBtn from "./pet-form-btn";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

type PetFormProps = {
  actionType: "add" | "edit";
  onFormSubmission: () => void;
};

type TPerForm = {
  name: string;
  ownerName: string;
  imageUrl: string;
  age: number;
  notes: string;
};

const petFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Name is required" })
    .max(7, { message: "Name should be less than 7 characters" }),
  ownerName: z
    .string()
    .trim()
    .min(1, { message: "Owner Name is required" })
    .max(20, { message: "Owner Name should be less than 20 characters" }),
  imageUrl: z.union([
    z.literal(""),
    z.string().url({ message: "Invalid URL" }),
  ]),
  age: z.coerce.number().int().max(999).positive(),
  notes: z.union([
    z.literal(""),
    z
      .string()
      .trim()
      .max(100, { message: "Notes should be less than 100 characters" }),
  ]),
});

export default function PetForm({
  actionType,
  onFormSubmission,
}: PetFormProps) {
  const { selectedPet, handleAddPet, handleEditPet } = usePetContext();

  const {
    register,
    formState: { errors },
    trigger,
  } = useForm<TPerForm>({
    resolver: zodResolver(petFormSchema),
  });

  return (
    <form
      action={async (formData) => {
        const result = await trigger();
        if (!result) return;

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
            {...register("name")}
            maxLength={7}
            defaultValue={actionType === "edit" ? selectedPet?.name : ""}
            placeholder="Name"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        <div>
          <Label htmlFor="ownerName">Owner Name</Label>
          <Input
            id="ownerName"
            {...register("ownerName")}
            defaultValue={actionType === "edit" ? selectedPet?.ownerName : ""}
            placeholder="Owner Name"
          />
          {errors.ownerName && (
            <p className="text-red-500">{errors.ownerName.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="imageUrl">Image Url</Label>
          <Input
            id="imageUrl"
            {...register("imageUrl")}
            defaultValue={
              actionType === "edit" &&
              selectedPet?.imageUrl !== DEFAULT_PET_IMAGE
                ? selectedPet?.imageUrl
                : ""
            }
            placeholder="Unsplash image URL"
          />
          {errors.imageUrl && (
            <p className="text-red-500">{errors.imageUrl.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            {...register("age")}
            defaultValue={actionType === "edit" ? selectedPet?.age : ""}
            placeholder="Age"
          />
          {errors.age && <p className="text-red-500">{errors.age.message}</p>}
        </div>

        <div>
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            {...register("notes")}
            maxLength={100}
            defaultValue={actionType === "edit" ? selectedPet?.notes : ""}
            placeholder="Notes"
          />
          {errors.notes && (
            <p className="text-red-500">{errors.notes.message}</p>
          )}
        </div>
      </div>

      <PetFormBtn actionType={actionType} />
    </form>
  );
}
