"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

export default function AuthFormButton({
  buttonText,
}: {
  buttonText?: string;
}) {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} className="w-[75%]">
      {buttonText || "Log In"}
    </Button>
  );
}
