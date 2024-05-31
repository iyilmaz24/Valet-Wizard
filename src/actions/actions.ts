"use server";

import { signIn, signOut } from "@/lib/auth";
import prisma from "@/lib/db";
import { TCar } from "@/lib/types";
import { carFormSchema, carIdSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";
import bcyrpt from "bcryptjs";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { use } from "react";

// -- user server actions --
export async function logIn(authFormData: FormData) {
  const user = Object.fromEntries(authFormData.entries());
  await signIn("credentials", user);
}

export async function logOut() {
  await signOut({ redirectTo: "/" });
}

export async function signUp(authFormData: FormData) {
  const user = Object.fromEntries(authFormData.entries());

  await prisma.user.create({
    data: {
      email: user.email as string,
      hashedPassword: await bcyrpt.hash(user.password as string, 10),
    },
  });
  await signIn("credentials", user);
}

// -- app server actions --
export async function addCar(car: unknown) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const validatedCar = carFormSchema.safeParse(car);
  if (!validatedCar.success) {
    return {
      message: "Invalid data. Please check your inputs and try again.",
    };
  }
  try {
    await prisma.car.create({
      data: {
        ...validatedCar.data,
        User: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });
  } catch (error) {
    return {
      message: "Request was unsuccessful. Please try again.",
    };
  }
  revalidatePath("/valet", "layout");
}

export async function editCar(carId: unknown, car: unknown) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const validatedCarId = carIdSchema.safeParse(carId);
  const validatedCar = carFormSchema.safeParse(car);
  if (!validatedCar.success || !validatedCarId.success) {
    return {
      message: "Invalid data. Please check your inputs and try again.",
    };
  }
  try {
    await prisma.car.update({
      where: { id: validatedCarId.data, userId: session.user.id },
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
  const session = await auth();
  if (!session?.user) redirect("/login");

  const validatedCarId = carIdSchema.safeParse(carId);
  if (!validatedCarId.success) {
    return {
      message: "Invalid data. Please check your inputs and try again.",
    };
  }
  try {
    await prisma.car.delete({
      where: { id: validatedCarId.data, userId: session.user.id },
    });
  } catch (error) {
    return {
      message: "Checkout was unsuccessful. Please try again.",
    };
  }
  revalidatePath("/valet", "layout");
}
