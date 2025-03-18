import { logIn, signUp } from "@/actions/actions";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default async function AuthForm({ type }: { type: "signUp" | "logIn" }) {
  return (
    <form action={type === "signUp" ? signUp : logIn}>
      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required />
      </div>

      <div className="space-y-1 mb-4 mt-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" required />
      </div>

      <Button type="submit">{type === "signUp" ? "Sign Up" : "Log In"}</Button>
    </form>
  );
}
