"use server";

import { signIn, signOut } from "@/lib/auth";
import prisma from "@/lib/db";
import { TCar } from "@/lib/types";
import { authSchema, carFormSchema, carIdSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";
import bcyrpt from "bcryptjs";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { use } from "react";
import { toast } from "sonner";
import { Prisma } from "@prisma/client";

// -- user server actions --
export async function logIn(authFormData: unknown) {
  // // check that authFormData is a FormData object
  if (!(authFormData instanceof FormData))
    return {
      message: "Log-in failed, please check your inputs.",
    };

  // const user = Object.fromEntries(authFormData.entries());
  // const validData = carFormSchema.safeParse(user);
  // if (!validData.success)
  //   return {
  //     message: "Login failed, please meet the email/password requirements.",
  //   };
  // Deprecate above code, pass FormData directly to next-auth instead of object

  await signIn("credentials", authFormData);
}

export async function logOut() {
  await signOut({ redirectTo: "/" });
}

export async function signUp(authFormData: unknown) {
  if (!(authFormData instanceof FormData))
    return {
      message: "Sign-up failed, please check your inputs.",
    };

  // convert FormData to object for zod
  const newUser = Object.fromEntries(authFormData.entries());
  const validatedFormData = authSchema.safeParse(newUser);
  if (!validatedFormData.success)
    return {
      message: "Sign-up failed, please check your inputs.",
    };

  const { email, password } = validatedFormData.data;
  try {
    await prisma.user.create({
      data: {
        email,
        hashedPassword: await bcyrpt.hash(password, 10),
      },
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return {
        message: "Sign-up failed, user already exists.",
      };
    }
    return {
      message: "Sign-up failed, could not create user.",
    };
  }
  await signIn("credentials", authFormData);
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
