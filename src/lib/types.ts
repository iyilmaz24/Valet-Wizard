import { Car } from "@prisma/client";

export type TCar = Omit<Car, "createdAt" | "updatedAt">;
