"use client";

import { logIn, signUp } from "@/actions/actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthFormButton from "./auth-form-button";
import { useFormState } from "react-dom";

export default function AuthForm({
  buttonText,
  formType,
}: {
  buttonText?: string;
  formType: "login" | "signup";
}) {
  const [signUpError, dispatchSignUp] = useFormState(signUp, undefined);
  const [logInError, dispatchLogIn] = useFormState(logIn, undefined);
  return (
    <form action={formType === "login" ? dispatchLogIn : dispatchSignUp}>
      <div className="space-y-1 mb-4">
        <Label htmlFor="email">Email</Label>
        <Input
          className="border-zinc-400"
          id="email"
          type="email"
          name="email"
          required
          maxLength={40}
        />
      </div>
      <div className="space-y-1 mb-8">
        <Label htmlFor="password">Password</Label>
        <Input
          className="border-zinc-400"
          id="password"
          type="password"
          name="password"
          required
          maxLength={40}
        />
      </div>
      <div className="flex flex-col items-center justify-center">
        <AuthFormButton buttonText={buttonText} />
        {signUpError && (
          <p className="text-red-500 text-xs mt-2">{signUpError.message}</p>
        )}
        {logInError && (
          <p className="text-red-500 text-xs mt-2">{logInError.message}</p>
        )}
      </div>
    </form>
  );
}
