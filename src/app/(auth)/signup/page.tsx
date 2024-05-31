import H1 from "@/components/H1";
import AuthForm from "../_components/auth-form";
import Link from "next/link";

export default function Page() {
  return (
    <main>
      <H1 className="text-center mb-5">Sign Up</H1>

      <AuthForm formType="signup" buttonText="Create Account"></AuthForm>

      <p className="text-zinc-500 mt-10 text-md text-center">
        Have an account?{" "}
        <Link href="/login" className="font-bold">
          Log in
        </Link>
      </p>
    </main>
  );
}
