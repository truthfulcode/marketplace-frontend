import type { NextApiRequest, NextApiResponse } from 'next'
import {prisma} from "../../../utils/prisma"
export const handler = async (req:NextApiRequest, res:NextApiResponse) => {
    const {username, userType} = req.body;
    try{
        let result = await prisma.account.findUnique({where:{
            username:username
        }})
        return result;
    } catch(err){
        
    }
}