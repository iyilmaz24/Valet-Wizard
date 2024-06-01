"use client";

import { Button } from "@/components/ui/button";
import { logOut } from "@/actions/actions";
import { useTransition } from "react";

export default function SignOutButton({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  const [isPending, startTransition] = useTransition();
  return (
    <Button
      disabled={isPending}
      onClick={async () => {
        startTransition(async () => {
          await logOut();
        });
      }}
      className={className}
    >
      {children || "Sign Out"}
    </Button>
  );
}
