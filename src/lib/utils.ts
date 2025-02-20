import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function sleep(ms: number = 1000) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

export function isValidImageUrl(url?: string) {
  if (!url) return false;
  return url.match(/\.(jpeg|jpg|gif|png|webp)$/) !== null;
}
