import H1 from "@/components/H1";
import AuthForm from "../_components/auth-form";
import Link from "next/link";

export default function Page() {
  return (
    <main>
      <H1 className="text-center mb-5">Welcome Back</H1>

      <AuthForm buttonText="Sign In"></AuthForm>

      <p className="text-zinc-500 mt-10 text-md text-center">
        No account yet?{" "}
        <Link href="/signup" className="font-bold">
          Sign up
        </Link>
      </p>
    </main>
  );
}
