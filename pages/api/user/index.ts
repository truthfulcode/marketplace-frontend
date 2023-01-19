import { NextApiRequest, NextApiResponse } from "next";
import { getUserByEmail, getUserByUsername, isValidAddress, isValidAddresses } from "../../../prisma/CRUD/user/read";
import { Account, Prisma } from '@prisma/client'
import createUser from "../../../prisma/CRUD/user/create";
import { incrementBalance } from "../../../prisma/CRUD/user/update";
import { encrypt } from "../../../utils/helpers";
import { RSC_MODULE_TYPES } from "next/dist/shared/lib/constants";
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
                  } else if (req.query.address) {
                    // Get a single user if id is provided is the query
                    // api/user?username=1
                    const isValid = await isValidAddress(req.query.address as string)
                    return res.status(200).json({state:isValid})
                  } else if(req.query.addresses){
                    let arrstr : string = JSON.parse(req.query.addresses as string);
                    const isValid = await isValidAddresses((arrstr).split(","))
                    return res.status(200).json({state:isValid})
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
              if(req.headers.key === process.env.DEPOSITS_KEY){
                if(req.query.addresses && req.query.amounts){
                    let addrstr : string = JSON.parse(req.query.addresses as string);
                    let amtstr : string = JSON.parse(req.query.amounts as string);
                    const addresses = (addrstr).split(",")
                    const amounts = (amtstr).split(",")
                    // ensure matching length
                    let commands : Promise<boolean>[] = [];
                    addresses.map((addr,index)=>commands.push(incrementBalance(addr,Number(amounts[index]))))
                    let result = await Promise.all(commands);
                    return res.status(200).json({state:result})
                  } else if(req.query.address && req.query.amount){
                    let addrstr : string = req.query.address as string;
                    let amtstr : Number = Number(req.query.amount);
                    console.log("deposit", addrstr, amtstr)
                    await isValidAddress(addrstr).then(async(isValid)=>{
                      let result = false;
                      if(isValid) result = await incrementBalance(addrstr, amtstr as number)
                      return res.status(200).json({state:result})
                    })
                  }
              }else{
                return res.status(401).json({error:"unauthorized access"});
              }
            }
            case 'DELETE':{

            }
        }
    }catch (error:any){
        console.log("ERR",error);
        return res.status(500).json({ ...error, message: error.message })
    }
    
}