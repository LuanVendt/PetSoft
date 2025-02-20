"use server";

import { DEFAULT_PET_IMAGE } from "@/lib/constants";
import prisma from "@/lib/db";
import { Pet } from "@/lib/types";
import { isValidImageUrl, sleep } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export async function addPet(data: Omit<Pet, "id">) {
  await sleep();
  try {
    await prisma.pets.create({
      data: {
        name: data.name,
        ownerName: data.ownerName,
        imageUrl: data.imageUrl,
        age: data.age,
        notes: data.notes,
      },
    });
  } catch (error) {
    return {
      message: "Could not add pet.",
    };
  }

  revalidatePath("/app", "layout");
}

export async function editPet(id: string, data: Omit<Pet, "id">) {
  let imageUrl = data.imageUrl;

  if (!isValidImageUrl(imageUrl)) imageUrl = DEFAULT_PET_IMAGE;
  await sleep();

  try {
    await prisma.pets.update({
      where: { id },
      data: {
        name: data.name,
        ownerName: data.ownerName,
        imageUrl,
        age: data.age,
        notes: data.notes,
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
