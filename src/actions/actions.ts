"use server";

import { signIn, signOut, auth } from "@/lib/auth-no-edge";
import prisma from "@/lib/db";
import { authSchema, carFormSchema, carIdSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";
import bcyrpt from "bcryptjs";
import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";
import { AuthError } from "next-auth";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// -- user server actions --
export async function logIn(prevState: unknown, authFormData: unknown) {
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
  try {
    await signIn("credentials", authFormData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin": {
          return {
            message: "Invalid credentials.",
          };
        }
        default:
          return {
            message: "Login failed, please try again.",
          };
      }
    }
    throw error; // throw NextJS redirect again to properly route client
  }
}

export async function logOut() {
  await signOut({ redirectTo: "/" });
}

export async function signUp(prevState: unknown, authFormData: unknown) {
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

// -- payment actions --
export async function createCheckoutSession() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const checkoutSession = await stripe.checkout.sessions.create({
    customer_email: session.user.email,
    line_items: [
      {
        price: "price_1PMn8tHyVeJjNhumGGr58kbT",
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.BASE_URL}/payment?success=true`,
    cancel_url: `${process.env.BASE_URL}/payment?canceled=true`,
  });

  redirect(checkoutSession.url);
}
