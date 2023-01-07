import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../utils/prisma";
import { validEmail } from "../../../utils/helpers";
export async function isValidUsername(username: string) {
  let result = await prisma.account.findFirst({
    where: {
      username: username,
    },
  });
  return result != null;
}
// returns null when if email is not found
export async function isValidEmail(email: string) {
  let result = await prisma.account.findFirst({
    where: {
      email: email,
    },
  });
  return result != null;
}
// returns null when if username or email is not found
export async function isValidUsernameOrEmail(username: string, email: string) {
  let result = await prisma.account.findFirst({
    where: {
      OR: [{ email: email }, { username: username }],
    },
  });
  return result != null;
}
// returns null when if username or email is not found
export async function getUser(input: string, password:string) {
  let result = await prisma.account.findFirst({
    where: { [validEmail(input) ? "email" : "username"]: input, password:password },
  });
  return result;
}
// returns null when username is not found
export async function getUserByUsername(username: string) {
  let result = await prisma.account.findFirst({
    where: {
      username: username,
    },
  });
  return result;
}
// returns null when email is not found
export async function getUserByEmail(email: string) {
  let result = await prisma.account.findFirst({
    where: {
      email: email,
    },
  });
  return result;
}
// returns null when not found user
export async function authenticateUser(
  emailOrUsername: string,
  password: string
) {
  let isEmail = emailOrUsername.includes("@");
  let result = await prisma.account.findFirst({
    where: isEmail
      ? {
          email: emailOrUsername,
        }
      : {
          username: emailOrUsername,
        },
  });
  return result;
}
