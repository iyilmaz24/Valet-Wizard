"use client";

import { Button } from "@/components/ui/button";
import { logOut } from "@/actions/actions";

export default function SignOutButton({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <Button onClick={async () => await logOut()} className={className}>
      {children || "Sign Out"}
    </Button>
  );
}
