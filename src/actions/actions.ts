"use server";

import prisma from "@/lib/db";
import { sleep } from "@/lib/utils";
import { petFormSchema, petIdSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";

export async function addPet(data: unknown) {
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

export async function editPet(id: unknown, data: unknown) {
  await sleep();

  const validateId = petIdSchema.safeParse(id);
  const validatedData = petFormSchema.safeParse(data);

  if (!validatedData.success || !validateId.success)
    return {
      message: "Invalid data.",
    };

  try {
    await prisma.pet.update({
      where: { id: validateId.data },
      data: validatedData.data,
    });
  } catch (error) {
    return {
      message: "Could not edit pet.",
    };
  }

  revalidatePath("/app", "layout");
}

export async function checkoutPet(id: unknown) {
  const validateId = petIdSchema.safeParse(id);
  if (!validateId.success) {
    return {
      message: "Invalid ID.",
      errors: validateId.error.formErrors,
    };
  }

  try {
    await prisma.pet.delete({ where: { id: validateId.data } });
  } catch (error) {
    return {
      message: "Could not checkout pet.",
    };
  }

  revalidatePath("/app", "layout");
}
