import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "./db";
import { compare } from "bcryptjs";

const config = {
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        // runs on login
        const { email, password } = credentials;

        const user = await prisma.user.findUnique({
          where: { email: email as string },
        });

        if (!user) return null;

        const passwordsMatch = await compare(
          password as string,
          user.hashedPassword
        );

        if (!passwordsMatch) return null;

        return user;
      },
    }),
  ],
  callbacks: {
    authorized({ auth, request }) {
      const { pathname } = request.nextUrl;
      const isLoggedIn = !!auth?.user?.email;

      if (
        pathname === "/login" ||
        pathname === "/signup" ||
        pathname === "/app"
      ) {
        if (isLoggedIn)
          return Response.redirect(new URL("/app/dashboard", request.nextUrl));

        return true;
      }

      if (pathname.startsWith("/app") && !isLoggedIn) return false;

      return true;
    },
    jwt({ token, user }) {
      if (user) token.userId = user.id;

      return token;
    },
    session: ({ session, token }) => {
      if (session.user) session.user.id = token.userId;

      return session;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, signIn, signOut, auth } = NextAuth(config);
