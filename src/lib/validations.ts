import { z } from "zod";

export const petFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Name is required" })
    .max(10, { message: "Name should be less than 10 characters" }),
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

export type TPetForm = z.infer<typeof petFormSchema>;
