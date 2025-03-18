import "server-only";

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Pet, User } from "@prisma/client";
import prisma from "./db";

export async function checkAuth() {
  const session = await auth();

  if (!session || !session?.user || !session?.user.id) redirect("/login");

  return session;
}

export async function getUserByEmail(email: User["email"]) {
  return await prisma.user.findUnique({
    where: { email },
  });
}

export async function getPetByPetId(petId: Pet["id"]) {
  return await prisma.pet.findUnique({
    where: { id: petId },
  });
}

export async function getPetsByUserId(userId: User["id"]) {
  return await prisma.pet.findMany({
    where: { userId },
  });
}
