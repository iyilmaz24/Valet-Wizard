"use client";

import { createCheckoutSession } from "@/actions/actions";
import H1 from "@/components/H1";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <main className="flex flex-col items-center justify-center">
      <H1>Purchase access for this account</H1>

      <Button
        className="mt-10"
        onClick={async () => await createCheckoutSession()}
      >
        Pay securely with Stripe
      </Button>
    </main>
  );
}
