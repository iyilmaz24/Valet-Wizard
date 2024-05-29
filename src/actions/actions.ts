"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function addCar(formData: FormData) {
  try {
    await prisma.car.create({
      data: {
        name: formData.get("name") as string,
        ownerName: formData.get("ownerName") as string,
        imageUrl: formData.get("imageUrl") as string,
        age: parseInt(formData.get("age") as string),
        notes: formData.get("notes") as string,
      },
    });
  } catch (error) {
    return {
      message: "Request was unsuccessful. Please try again.",
    };
  }
  revalidatePath("/valet", "layout");
}

export async function editCar(carId: string, formData: FormData) {
  try {
    await prisma.car.update({
      where: { id: carId },
      data: {
        name: formData.get("name") as string,
        ownerName: formData.get("ownerName") as string,
        imageUrl: formData.get("imageUrl") as string,
        age: parseInt(formData.get("age") as string),
        notes: formData.get("notes") as string,
      },
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
