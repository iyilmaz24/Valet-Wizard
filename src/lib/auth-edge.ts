import { NextAuthConfig } from "next-auth";
import prisma from "./db";

export const nextAuthEdgeConfig = {
  pages: {
    signIn: "/login",
  },
  session: {
    maxAge: 7 * 24 * 60 * 60,
    strategy: "jwt",
  },
  callbacks: {
    authorized: ({ auth, request }) => {
      // runs on every request using middleware
      const isLoggedIn = !!auth?.user; // turn into Boolean with '!!'
      const privateAccess = request.nextUrl.pathname.includes("/valet");

      if (!isLoggedIn && privateAccess) {
        return Response.redirect(new URL("/login", request.nextUrl));
      }

      if (isLoggedIn && privateAccess && !auth?.user.subscriptionActive) {
        return Response.redirect(new URL("/payment", request.nextUrl));
      }

      if (isLoggedIn && privateAccess && auth?.user.subscriptionActive) {
        return true; // returns True to grant access
      }

      if (
        isLoggedIn &&
        (request.nextUrl.pathname.includes("/login") ||
          request.nextUrl.pathname.includes("/signup")) &&
        auth.user.subscriptionActive
      ) {
        return Response.redirect(new URL("/valet/dashboard", request.nextUrl));
      }

      if (isLoggedIn && !privateAccess && !auth.user.subscriptionActive) {
        if (
          request.nextUrl.pathname.includes("/login") ||
          request.nextUrl.pathname.includes("/signup")
        ) {
          return Response.redirect(new URL("/payment", request.nextUrl));
        }
        return true;
      }

      if (!isLoggedIn && !privateAccess) {
        return true; // if route doesnt require auth and not logged in, return True
      }

      return false;
    },
    jwt: async ({ token, user, trigger }) => {
      if (user) {
        token.userId = user.id;
        token.email = user.email!;
        token.subscriptionActive = user.subscriptionActive;
      }
      if (trigger === "update") {
        const userFromDb = await prisma.user.findUnique({
          where: {
            email: token.email,
          },
        });
        if (userFromDb) {
          token.subscriptionActive = userFromDb.subscriptionActive;
        }
      }
      return token;
    },
    session: ({ session, token }) => {
      if (session.user) {
        session.user.id = token.userId;
        session.user.subscriptionActive = token.subscriptionActive;
      }
      return session;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
