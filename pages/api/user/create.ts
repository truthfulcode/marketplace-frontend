import type { NextApiRequest, NextApiResponse } from 'next'
import { sha512 } from '../../../utils/helpers';
import {prisma} from "../../../utils/prisma"
import { AccountType } from '../../../utils/types';
export const handler = async (req:NextApiRequest, res:NextApiResponse) => {
    const {username, email, password, phoneNumber, userType} = req.body;
    /// @dev check that username | email is not already taken
    const hashedPassword = sha512(password);
    try{
        if(userType == AccountType.Customer){
            await prisma.customer.create({data:{
                account:{
                    create:{
                        username:username,
                        password:password,
                        phoneNumber:phoneNumber,
                        firstName:firstName,
                        lastName:lastName,
                        
                    }
                },
            }})
        }else if(userType == AccountType.Freelancer){
            await prisma.customer.create({})
        }
    }catch{

    }
    
}