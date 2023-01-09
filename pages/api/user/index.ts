import { NextApiRequest, NextApiResponse } from "next";
import { getUserByEmail, getUserByUsername } from "../../../prisma/CRUD/user/read";
import { Account, Prisma } from '@prisma/client'
import createUser from "../../../prisma/CRUD/user/create";
export default async function handler (req:NextApiRequest, res:NextApiResponse) {
    try{
        switch(req.method){
            case 'GET':{
                if (req.query.username) {
                    // Get a single user if id is provided is the query
                    // api/user?username=1
                    const user = await getUserByUsername(req.query.username as string)
                    return res.status(200).json(user)
                  } else if(req.query.email){
                    const user = await getUserByEmail(req.query.email as string)
                    return res.status(200).json(user)
                  } 
            }
            case 'POST':{
                const {username, firstName, lastName, email, password, phoneNumber, accountType} = req.body;
                console.log("pass",password)
                const account : Account = {
                    id: "",
                    username: username,
                    email: email,
                    firstName: firstName,
                    lastName: lastName,
                    password: password,
                    phoneNumber: phoneNumber,
                    accountType: accountType,
                    providerType: "",
                    providerId: "",
                    providerAccountId: "",
                    refreshToken: null,
                    accessToken: null,
                    accessTokenExpires: null,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    emailVerified: null
                }
                const user = await createUser(account);
                return res.json(user)
            }
            case 'PUT':{

            }
            case 'DELETE':{

            }
        }
    }catch (error:any){
        console.log("ERR",error);
        return res.status(500).json({ ...error, message: error.message })
    }
    
}