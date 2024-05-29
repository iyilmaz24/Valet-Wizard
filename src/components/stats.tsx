"use client";

import { useCarContext } from "@/lib/hooks";

export default function Stats() {
  const { totalCars } = useCarContext();
  return (
    <section className="text-center">
      <p className="text-2xl font-bold leading-6">{totalCars}</p>
      <p className="opacity-80">current vehicles</p>
    </section>
  );
}
