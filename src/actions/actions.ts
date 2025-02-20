"use server";

import { DEFAULT_PET_IMAGE } from "@/lib/constants";
import prisma from "@/lib/db";
import { isValidImageUrl, sleep } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export async function addPet(formData: FormData) {
  let imageUrl = String(formData.get("imageUrl"));

  if (!isValidImageUrl(imageUrl)) imageUrl = DEFAULT_PET_IMAGE;
  await sleep();

  try {
    await prisma.pets.create({
      data: {
        name: String(formData.get("name")),
        ownerName: String(formData.get("ownerName")),
        imageUrl,
        age: Number(formData.get("age")),
        notes: String(formData.get("notes")),
      },
    });
  } catch (error) {
    return {
      message: "Could not add pet.",
    };
  }

  revalidatePath("/app", "layout");
}

export async function editPet(id: string, formData: FormData) {
  let imageUrl = String(formData.get("imageUrl"));

  if (!isValidImageUrl(imageUrl)) imageUrl = DEFAULT_PET_IMAGE;
  await sleep();

  try {
    await prisma.pets.update({
      where: { id },
      data: {
        name: String(formData.get("name")),
        ownerName: String(formData.get("ownerName")),
        imageUrl,
        age: Number(formData.get("age")),
        notes: String(formData.get("notes")),
      },
    });
  } catch (error) {
    return {
      message: "Could not edit pet.",
    };
  }

  revalidatePath("/app", "layout");
}

export async function checkoutPet(id: string) {
  await sleep();

  try {
    await prisma.pets.delete({ where: { id } });
  } catch (error) {
    return {
      message: "Could not checkout pet.",
    };
  }

  revalidatePath("/app", "layout");
}
