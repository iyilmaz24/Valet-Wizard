import {} from "next-auth";

declare module "@auth/core/jwt" {
  interface JWT {
    userId: string;
    subscriptionActive: boolean;
    email: string;
  }
}

declare module "next-auth" {
  interface User {
    subscriptionActive: boolean;
    email: string;
  }

  interface Session {
    user: User & {
      id: string;
    };
  }
}
