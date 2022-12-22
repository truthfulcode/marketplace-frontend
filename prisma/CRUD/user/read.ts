import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../utils/prisma";
export async function isValidUsername(username: string) {
  try {
    let result = await prisma.account.findFirst({
      where: {
        username: username,
      },
    });
    return result != null;
  } catch (err) {
    console.error("error thrown", err);
  }
}
export async function isValidEmail(email: string) {
  let result = await prisma.account.findFirst({
    where: {
      email: email,
    },
  });
  return result != null;
}
export async function isValidUsernameOrEmail(username:string,email: string) {
    let result = await prisma.account.findFirst({
      where: {
        OR:[{email:email},{username:username}]
      },
    });
    return result != null;
  }
export async function getUserByUsername(username: string) {
  try {
    let result = await prisma.account.findFirst({
      where: {
        username: username,
      },
    });
    return result;
  } catch (err) {
    console.error("error thrown", err);
  }
}
export async function getUserByEmail(email: string) {
  try {
    let result = await prisma.account.findFirst({
      where: {
        email: email,
      },
    });
    return result;
  } catch (err) {
    console.error("error thrown", err);
  }
}
