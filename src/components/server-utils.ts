import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function checkAuth() {
  const session = await auth();

  if (!session || !session?.user || !session?.user.id) redirect("/login");

  return session;
}
