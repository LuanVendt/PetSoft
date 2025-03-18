import AuthForm from "@/components/auth-form";
import H1 from "@/components/h1";
import Link from "next/link";

export default function Login() {
  return (
    <main>
      <H1 className="text-center mb-5">Log In</H1>

      <AuthForm type="logIn" />

      <p className="mt-6 text-sm text-zinc-500">
        No account yet?{" "}
        <Link
          href="/signup"
          className="font-medium hover:underline text-zinc-700"
        >
          Sign up
        </Link>
      </p>
    </main>
  );
}
