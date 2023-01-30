import { Prisma, Account, EthereumAccount } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import Customer from "../../../models/Customer";
import { generateAndHashPK, isString, sha512 } from "../../../utils/helpers";
import { prisma } from "../../../utils/prisma";
import { AccountType } from "../../../utils/types";
import { isValidEmail, isValidUsername, isValidUsernameOrEmail } from "./read";
export default async function createUser(obj: Account) {
  const {
    username,
    firstName,
    lastName,
    email,
    password,
    phoneNumber,
    accountType,
  } = obj;
  const isCustomer = accountType === "CUSTOMER";
  /// @dev check that username | email is not already taken
  console.log("user", obj);
  // check userType is valid
  if (!["CUSTOMER", "FREELANCER"].includes(accountType))
    throw Error("incorrect userType");
  // if(!email.match(mailFormat)) throw Error("invalid email format");
  console.log("req object", obj);
  if (typeof username !== "string") throw Error("invalid username");
  if (password.length != 128) throw Error("invalid password");
  if (await isValidUsernameOrEmail(username, email))
    throw Error("invalid username or email");
  const acc = generateAndHashPK();
  if (isCustomer) {
    // customer
    await prisma.account.create({
      data: {
        username: username,
        password: password,
        phoneNumber: phoneNumber,
        firstName: firstName,
        lastName: lastName,
        email: email,
        accountType: accountType,
        ethereumAccount: {
          create: {
            address: acc.address,
            balance: 0,
            lockedBalance: 0,
            encryptedData: acc.encryptedData,
            iv: acc.iv,
          },
        },
        user: { create: {
          email:email
        } },
        customer: {
          create: {},
        },
      },
    });
  } else {
    // freelancer
    await prisma.freelancer.create({
      data: {
        account: {
          create: {
            username: username,
            password: password,
            phoneNumber: phoneNumber,
            firstName: firstName,
            lastName: lastName,
            email: email,
            accountType: accountType,
            ethereumAccount: {
              create: {
                address: acc.address,
                balance: 0,
                lockedBalance: 0,
                encryptedData: acc.encryptedData,
                iv: acc.iv,
              },
            },
            user: { create: {
              email:email
            } },
          },
        },
      },
    });
    
  }
}
