import NextAuth, { NextAuthConfig } from "next-auth";
import prisma from "./db";
import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials";
import { authSchema } from "./validations";
import { nextAuthEdgeConfig } from "./auth-edge";

const config = {
  ...nextAuthEdgeConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        // runs on login attempt

        const validData = authSchema.safeParse(credentials);
        // check that the object passes the zod validation
        if (!validData.success) return null;

        const { email, password } = validData.data;
        const user = await prisma.user.findUnique({
          where: { email },
        });
        if (!user) return null;

        const validPassword = await bcrypt.compare(
          password,
          user.hashedPassword
        );
        if (!validPassword) return null;

        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(config);
