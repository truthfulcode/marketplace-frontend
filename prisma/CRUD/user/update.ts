import type { NextApiRequest, NextApiResponse } from 'next'
import express, { Request, Response } from 'express';
import { MongoClient, Db } from 'mongodb';
export default function handler(req:NextApiRequest, res:NextApiResponse){
    
}

const app = express();
const mongoUrl = 'mongodb://localhost:27017';
const dbName = 'mydatabase';

let db: Db;

MongoClient.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
  if (error) {
    console.error(error);
    process.exit(1);
  }
// check address existence then decrement
  export async function decrementBalance(address: string, amount:number) {
    await getAddressId(address).then(async(res)=>{
      let result = null;
      if(res){
        result = await prisma.ethereumAccount.update({
          where:{id:res.id},
          data:{balance:{decrement:amount}}
        }).then(()=>{
          console.log("updated record")
        })
      }
      return result != null;
    })
  }