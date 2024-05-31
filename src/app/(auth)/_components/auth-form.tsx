import { logIn, signUp } from "@/actions/actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthFormButton from "./auth-form-button";

export default function AuthForm({
  buttonText,
  formType,
}: {
  buttonText?: string;
  formType: "login" | "signup";
}) {
  return (
    <form action={formType === "login" ? logIn : signUp}>
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
      <div className="flex justify-center">
        <AuthFormButton buttonText={buttonText} />
      </div>
    </form>
  );
}
