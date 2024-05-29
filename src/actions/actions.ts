"use server";

import prisma from "@/lib/db";
import { TCar } from "@/lib/types";
import { revalidatePath } from "next/cache";

export async function addCar(car: Omit<TCar, "id">) {
  try {
    await prisma.car.create({
      data: car,
    });
  } catch (error) {
    return {
      message: "Request was unsuccessful. Please try again.",
    };
  }
  revalidatePath("/valet", "layout");
}

export async function editCar(carId: string, car: Omit<TCar, "id">) {
  try {
    await prisma.car.update({
      where: { id: carId },
      data: car,
    });
  } catch (error) {
    return {
      message: "Changes not saved. Please try again.",
    };
  }
  revalidatePath("/valet", "layout");
}

export async function checkOutCar(carId: string) {
  try {
    await prisma.car.delete({
      where: { id: carId },
    });
  } catch (error) {
    return {
      message: "Checkout was unsuccessful. Please try again.",
    };
  }
  revalidatePath("/valet", "layout");
}
