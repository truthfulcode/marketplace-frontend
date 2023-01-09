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


const options: NextAuthOptions = {
  debug: true,
  providers: [
    // EmailProvider({
    //   server: {
    //     host: process.env.SMTP_HOST,
    //     port: Number(process.env.SMTP_PORT),
    //     auth: {
    //       user: process.env.SMTP_USER,
    //       pass: process.env.SMTP_PASSWORD,
    //     },
    //   },
    //   from: process.env.EMAIL_FROM,
    // }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      id: "credentials",
      name: "credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.

      // credentials: {
      //   username: {
      //     label: "Username",
      //     type: "text",
      //     placeholder: "jsmith",
      //   },
      //   password: { label: "Password", type: "password" },
      // },
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
          console.log(user);
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
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
  logger: {
    error: (code, metadata) => {
      console.error(code, metadata);
      // logger.error();
    },
    warn: (code) => {
      console.error(code);
    },
    debug: (code, metadata) => {
      console.error(code, metadata);
    },
  },
  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60, // 30 days },
  // // callbacks
  // callbacks: {
  //   signIn: async ({
  //     user,
  //     account,
  //     profile,
  //     email,
  //     credentials,
  //   }) => {
  //     console.debug(`signIn:user`, user, "\n\n");
  //     console.debug(`signIn:account`, account, "\n\n");
  //     console.debug(`signIn:profile`, profile, "\n\n");
  //     return true;
  //   },
  // redirect: async ({ url, baseUrl }): Promise<any> => {
  //   console.debug(`url, baseUrl`, url, baseUrl);
  //   const params = new URLSearchParams(new URL(url).search);
  //   const callbackUrl = params.get("callbackUrl");
  //   if (url.startsWith(baseUrl)) {
  //     if (callbackUrl?.startsWith("/")) {
  //       console.debug("redirecting to", baseUrl + callbackUrl);
  //       return baseUrl + callbackUrl;
  //     } else if (callbackUrl?.startsWith(baseUrl)) {
  //       console.debug("redirecting to", callbackUrl);
  //       return callbackUrl;
  //     }
  //   } else {
  //     console.debug("redirecting to", baseUrl);
  //     return Promise.resolve(baseUrl);
  //   }
  //   // return Promise.resolve(url.startsWith(baseUrl) ? url : baseUrl);
  // },
  //   // Getting the JWT token from API response
  //   jwt: async ({ token, user, account, profile, isNewUser }) => {
  //     console.debug(`jwt:token`, token, "\n\n");
  //     console.debug(`jwt:user`, user, "\n\n");
  //     console.debug(`jwt:account`, account, "\n\n");
  //     const isSigningIn = user ? true : false;
  //     if (isSigningIn) {
  //     //@ts-ignore
  //       token.jwt = user.access_token;
  //       token.user = user;
  //     } else {
  //       console.debug(`jwt:isSignIn: user is not logged in`, "\n\n");
  //     }
  //     console.debug(`resolving token`, token, "\n\n");
  //     return Promise.resolve(token);
  //   },
  //   session: async ({ session, token }) => {
  //     console.debug(`session:session`, session, "\n\n");
  //     console.debug(`session:token`, token, "\n\n");
  //     //@ts-ignore
  //     session.jwt = token.jwt;
  //     //@ts-ignore
  //     session.user = token.user;
  //     console.debug(`resolving session`, session, "\n\n");
  //     return Promise.resolve(session);
  //   },
  // },
  // // session
  // session: {
  //   // Choose how you want to save the user session.
  //   // The default is `"jwt"`, an encrypted JWT (JWE) in the session cookie.
  //   // If you use an `adapter` however, we default it to `"database"` instead.
  //   // You can still force a JWT session by explicitly defining `"jwt"`.
  //   // When using `"database"`, the session cookie will only contain a `sessionToken` value,
  //   // which is used to look up the session in the database.
  //   strategy: "jwt",

  //   // Seconds - How long until an idle session expires and is no longer valid.
  //   maxAge: 30 * 24 * 60 * 60, // 30 days

  //   // Seconds - Throttle how frequently to write to database to extend a session.
  //   // Use it to limit write operations. Set to 0 to always update the database.
  //   // Note: This option is ignored if using JSON Web Tokens
  //   updateAge: 24 * 60 * 60, // 24 hours
}
}
const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;
