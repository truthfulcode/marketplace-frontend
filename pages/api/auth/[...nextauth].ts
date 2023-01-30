import { NextApiHandler } from "next";
import NextAuth, { NextAuthOptions } from "next-auth";
import Providers from "next-auth/providers";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../utils/prisma";
// import { logger } from "../../../lib/logger";
import GitHubProvider from "next-auth/providers/github";
import EmailProvider from "next-auth/providers/email";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUser } from "../../../prisma/CRUD/user/read";
import { TransactionType } from "../../../utils/types";


export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  debug: true,
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      id: "credentials",
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials, req) => {
        try {
          let user = await getUser(
            credentials?.username ? credentials.username : "",
            credentials?.password ? credentials.password : ""
          )
          console.log("user",user);
          return user ? user : null;
        } catch (err) {
          console.log("err", err);
          return null;
        }
      },
    }),
  ],
  // pages
  pages: {
    signIn: "/signin",
    // signOut: "/signout",
  },
  callbacks: {
		async jwt({ token, user, account, profile, isNewUser }) { 

			user && (token.user = user);
			return token
		},

		session({ session, token, user }) {
			
			token.user && (session.user = token.user);

			return session
		},
	},
  jwt: {
		secret: process.env.SECRET,
	},
  secret: process.env.SECRET,
  logger: {
    error: (code, metadata) => {
      console.error("auth err",code, metadata);
      // logger.error();
    },
    warn: (code) => {
      console.error("auth warn",code);
    },
    debug: (code, metadata) => {
      console.error("auth debug",code, metadata);
    },
  },
  session: { 
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 0, // 24 hours
    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    // updateAge: 24 * 60 * 60, // 24 hours
  },
}
const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, authOptions);
export default authHandler;
