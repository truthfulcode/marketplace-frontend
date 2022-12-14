import { Account } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'
import { isString, sha512 } from '../../../utils/helpers';
import {prisma} from "../../../utils/prisma"
import { AccountType } from '../../../utils/types';
import { isValidEmail, isValidUsername, isValidUsernameOrEmail } from './read';

export default async function createUser(obj:Account) {
    const {username, firstName, lastName, email, password, phoneNumber, accountType} = obj;
    /// @dev check that username | email is not already taken
    console.log("user",obj)
    // check userType is valid
    if(!["CUSTOMER","FREELANCER"].includes(accountType)) throw Error("incorrect userType")
    const mailFormat = /^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/;
    // if(!email.match(mailFormat)) throw Error("invalid email format");
    if (typeof username !== "string") throw Error('invalid username')
    if(password.length != 128) throw Error("invalid password");
        if(await isValidUsernameOrEmail(username,email)) throw Error("invalid username or email")
        await prisma.account.create({data:{
            username:username,
                    password:password,
                    phoneNumber:phoneNumber,
                    firstName:firstName,
                    lastName:lastName,
                    email:email,
                    accountType: accountType,
                    providerType:"", 
                    providerId:"", 
                    providerAccountId:""
                    // compoundId:"", 
        }})
    
    
}