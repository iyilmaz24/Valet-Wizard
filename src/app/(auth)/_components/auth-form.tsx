import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AuthForm({ buttonText }: { buttonText?: string }) {
  return (
    <form action="">
      <div className="space-y-1 mb-4">
        <Label htmlFor="email">Email</Label>
        <Input className="border-zinc-400" id="email" type="email" />
      </div>
      <div className="space-y-1 mb-8">
        <Label htmlFor="password">Password</Label>
        <Input className="border-zinc-400" id="password" type="password" />
      </div>
      <div className="flex justify-center">
        <Button className="w-[75%]">{buttonText || "Log In"}</Button>
      </div>
    </form>
  );
}
