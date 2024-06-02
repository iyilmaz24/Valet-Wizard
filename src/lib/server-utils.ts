import "server-only";

import { User } from "@prisma/client";
import prisma from "./db";

export async function getUserByEmail(email: User["email"]) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return user;
}
