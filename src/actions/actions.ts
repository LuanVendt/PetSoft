"use server";

import prisma from "@/lib/db";
import { PetPayload } from "@/lib/types";
import { sleep } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export async function addPet(data: PetPayload) {
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

export async function editPet(id: string, data: PetPayload) {
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
