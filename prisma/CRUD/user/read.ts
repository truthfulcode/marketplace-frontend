import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../utils/prisma";
import { sha512, validEmail } from "../../../utils/helpers";
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
  console.log(input,password,validEmail(input))
  let res
  if(validEmail(input)){
    res = await prisma.account.findUnique({
      where: { email : input},
    })
  }else{
    res = await prisma.account.findUnique({
      where: { username : input},
    })
  }
  return res && res.password === sha512(password) ? res : null;    
}
// returns null when username is not found
export async function getUserByUsername(username: string) {
  let result = await prisma.account.findUnique({
    where: {
      username: username,
    },
  });
  return result;
}
// returns null when email is not found
export async function getUserByEmail(email: string) {
  let result = await prisma.account.findUnique({
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

