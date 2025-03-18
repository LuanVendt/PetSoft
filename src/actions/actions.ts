"use server";

import { auth, signIn, signOut } from "@/lib/auth";
import prisma from "@/lib/db";
import { sleep } from "@/lib/utils";
import { petFormSchema, petIdSchema } from "@/lib/validations";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function logIn(formData: FormData) {
  const authData = Object.fromEntries(formData.entries());

  await signIn("credentials", {
    redirectTo: "/app/dashboard",
    ...authData,
  });
}

export async function signUp(authData: FormData) {
  const hashedPassword = await bcrypt.hash(
    authData.get("password") as string,
    10
  );

  await prisma.user.create({
    data: {
      email: authData.get("email") as string,
      hashedPassword,
    },
  });

  await signIn("credentials", {
    redirectTo: "/app/dashboard",
    email: authData.get("email") as string,
    password: authData.get("password") as string,
  });
}

export async function logOut() {
  await signOut({ redirectTo: "/" });
}

export async function addPet(data: unknown) {
  const validatedData = petFormSchema.safeParse(data);

  const session = await auth();

  if (!session) redirect("/login");

  if (!validatedData.success) {
    return {
      message: "Invalid data.",
      errors: validatedData.error.formErrors,
    };
  }

  await sleep();
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email as string,
      },
    });

    if (!user) {
      return {
        message: "User not found.",
      };
    }

    await prisma.pet.create({
      data: { ...validatedData.data, userId: user.id },
    });
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
