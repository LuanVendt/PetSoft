"use server";

import prisma from "@/lib/db";
import { Pet } from "@/lib/types";

export async function addPet(data: Omit<Pet, "id">) {
  return await prisma.pets.create({ data });
}

export async function editPet(id: string, data: Omit<Pet, "id">) {
  return await prisma.pets.update({ where: { id }, data });
}

export async function checkoutPet(id: string) {
  return await prisma.pets.delete({ where: { id } });
}
