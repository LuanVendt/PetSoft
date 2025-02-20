"use server";

import prisma from "@/lib/db";
import { sleep } from "@/lib/utils";
import { Pet } from "@prisma/client";
import { revalidatePath } from "next/cache";

type PetData = Omit<Pet, "id" | "createdAt" | "updatedAt">;

export async function addPet(data: PetData) {
  await sleep();
  try {
    await prisma.pet.create({ data });
  } catch (error) {
    return {
      message: "Could not add pet.",
    };
  }

  revalidatePath("/app", "layout");
}

export async function editPet(id: string, data: PetData) {
  await sleep();

  try {
    await prisma.pet.update({
      where: { id },
      data,
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
    await prisma.pet.delete({ where: { id } });
  } catch (error) {
    return {
      message: "Could not checkout pet.",
    };
  }

  revalidatePath("/app", "layout");
}
