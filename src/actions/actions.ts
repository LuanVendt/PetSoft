"use server";

import prisma from "@/lib/db";
import { PetEssentials } from "@/lib/types";
import { sleep } from "@/lib/utils";
import { petFormSchema } from "@/lib/validations";
import { Pet } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function addPet(data: PetEssentials) {
  const validatedData = petFormSchema.safeParse(data);
  if (!validatedData.success) {
    return {
      message: "Invalid data.",
      errors: validatedData.error.formErrors,
    };
  }

  await sleep();
  try {
    await prisma.pet.create({ data: validatedData.data });
  } catch (error) {
    return {
      message: "Could not add pet.",
    };
  }

  revalidatePath("/app", "layout");
}

export async function editPet(id: Pet["id"], data: PetEssentials) {
  await sleep();

  const validatedData = petFormSchema.safeParse(data);
  if (!validatedData.success) {
    return {
      message: "Invalid data.",
      errors: validatedData.error.formErrors,
    };
  }

  try {
    await prisma.pet.update({
      where: { id },
      data: validatedData.data,
    });
  } catch (error) {
    return {
      message: "Could not edit pet.",
    };
  }

  revalidatePath("/app", "layout");
}

export async function checkoutPet(id: Pet["id"]) {
  try {
    await prisma.pet.delete({ where: { id } });
  } catch (error) {
    return {
      message: "Could not checkout pet.",
    };
  }

  revalidatePath("/app", "layout");
}
