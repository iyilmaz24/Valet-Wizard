"use client";

import { createCheckoutSession } from "@/actions/actions";
import H1 from "@/components/H1";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export default function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const [isPending, startTransition] = useTransition();
  const { update } = useSession();
  const router = useRouter();

  return (
    <main className="flex flex-col items-center justify-center">
      {!searchParams.success && (
        <>
          <H1>Purchase access for this account</H1>
          <Button
            disabled={isPending}
            className="mt-10"
            onClick={async () => {
              startTransition(async () => {
                await createCheckoutSession();
              });
            }}
          >
            {isPending
              ? "Redirecting to Stripe..."
              : "Purchase securely with Stripe"}
          </Button>
          {searchParams.canceled && (
            <p className="mt-5 text-red-500">
              Payment unsuccessful, please try again.
            </p>
          )}
        </>
      )}

      {searchParams.success && (
        <>
          <H1>ValetWizard</H1>

          <Button
            disabled={isPending}
            className="mt-10 "
            onClick={async () => {
              startTransition(async () => {
                await update(true);
                router.push("/valet/dashboard");
              });
            }}
          >
            {isPending ? "Loading..." : "Access ValetWizard"}
          </Button>
          <p className="mt-5 text-green-500">Thank you for your purchase!</p>
        </>
      )}
    </main>
  );
}
