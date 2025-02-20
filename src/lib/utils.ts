import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function sleep(ms: number = 1000) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

export async function isValidImageUrl(url?: string) {
  if (!url) return false;

  try {
    const parsedUrl = new URL(url);

    if (!parsedUrl.hostname.includes("unsplash.com")) {
      return false;
    }

    const response = await fetch(url, { method: "HEAD" });
    if (!response.ok) {
      return false;
    }

    const contentType = response.headers.get("Content-Type") || "";
    if (!contentType.startsWith("image/")) {
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
}
