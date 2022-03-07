import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";

import clientPromise from "../../../lib/mongodb";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // ...add more providers here
  ],

  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: "fasdfdasfdasf",
  },
  callbacks: {
    redirect: ({ baseUrl }) => {
      return `${baseUrl}/auth`;
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.id = token.id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth",
    newUser: "/welcome",
  },
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.SECRET,
});
