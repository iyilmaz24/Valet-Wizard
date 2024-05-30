"use server";

import prisma from "@/lib/db";
import { TCar } from "@/lib/types";
import { carFormSchema, carIdSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";

export async function addCar(car: unknown) {
  const validatedCar = carFormSchema.safeParse(car);
  if (!validatedCar.success) {
    return {
      message: "Invalid data. Please check your inputs and try again.",
    };
  }
  try {
    await prisma.car.create({
      data: validatedCar.data,
    });
  } catch (error) {
    return {
      message: "Request was unsuccessful. Please try again.",
    };
  }
  revalidatePath("/valet", "layout");
}

export async function editCar(carId: unknown, car: unknown) {
  const validatedCarId = carIdSchema.safeParse(carId);
  const validatedCar = carFormSchema.safeParse(car);
  if (!validatedCar.success || !validatedCarId.success) {
    return {
      message: "Invalid data. Please check your inputs and try again.",
    };
  }
  try {
    await prisma.car.update({
      where: { id: validatedCarId.data },
      data: validatedCar.data,
    });
  } catch (error) {
    return {
      message: "Changes not saved. Please try again.",
    };
  }
  revalidatePath("/valet", "layout");
}

export async function checkOutCar(carId: unknown) {
  const validatedCarId = carIdSchema.safeParse(carId);
  if (!validatedCarId.success) {
    return {
      message: "Invalid data. Please check your inputs and try again.",
    };
  }
  try {
    await prisma.car.delete({
      where: { id: validatedCarId.data },
    });
  } catch (error) {
    return {
      message: "Checkout was unsuccessful. Please try again.",
    };
  }
  revalidatePath("/valet", "layout");
}
