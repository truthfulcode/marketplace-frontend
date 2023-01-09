import {prisma} from "../../utils/prisma"
import type { NextApiRequest, NextApiResponse } from 'next'
import { Proposal } from '@prisma/client';
import { Message } from "@mui/icons-material";



export default  async function handler(req: NextApiRequest,res: NextApiResponse) {
    const {title ,description ,duration ,status} = req.body
    try{
        await prisma.proposal.create({
            data :{
               title,
               description,
               duration,
               status,
               freelancerId:""
            },
        })
        res.status(200).json({message: 'notecreated'});
    } catch(error){

    }



}