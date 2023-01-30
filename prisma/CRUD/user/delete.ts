import type { NextApiRequest, NextApiResponse } from 'next'
import { Account } from '@prisma/client';
import { isString, sha512 } from '../../../utils/helpers';
import {prisma} from "../../../utils/prisma"
import { AccountType } from '../../../utils/types';
import { isValidEmail, isValidUsername, isValidUsernameOrEmail } from './read';
export async function deleteUser(id: string){
    if(id!=null){
        try {
            await prisma.account.delete({
                where:{
                    id: id,
                }
            })
        } catch (error) {
            console.log("Error: ", error);
        }

        try {
            await prisma.freelancer.delete({
                where:{
                    id: id,
                }
            })
        } catch (error) {
        }

        try {
            await prisma.customer.delete({
                where:{
                    id: id,
                }
            })
        } catch (error) {
        }
    }
}

export async function deleteListing(lid: string){
    if(lid!=null){
        try {
            await prisma.listing.delete({
                where:{
                    id: lid,
                }
            })
        } catch (error) {
            console.log("Error: ", error);
        }
    }
}

export async function declineTran(lid: string){
    if(lid!=null){
        try {
            await prisma.transaction.update({
                where:{
                    txId: lid,
                },
                data: {
                    status: "FAILED",
                },
            })
        } catch (error) {
            console.log("Error: ", error);
        }
    }
}

export async function cancelOrder(lid: string){
    if(lid!=null){
        try {
            await prisma.order.update({
                where:{
                    id: lid,
                },
                data: {
                    status: "CANCELLED",
                },
            })
        } catch (error) {
            console.log("Error: ", error);
        }
    }
}