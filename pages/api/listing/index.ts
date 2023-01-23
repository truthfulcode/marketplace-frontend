import { NextApiRequest, NextApiResponse } from "next";
import {
  getEthAccountByAddress,
  getUserByEmail,
  getUserByUsername,
  isValidAddress,
  isValidAddresses,
} from "../../../prisma/CRUD/user/read";
import { Account, Listing, Prisma } from "@prisma/client";
import createUser from "../../../prisma/CRUD/user/create";
import { incrementBalance } from "../../../prisma/CRUD/user/update";
import { encrypt } from "../../../utils/helpers";
import { RSC_MODULE_TYPES } from "next/dist/shared/lib/constants";
import {
  getTransactionsOfEthereumAccountUsingAddress,
  isTxHashRecorded,
} from "../../../prisma/CRUD/transaction/read";
import { insertTxIntoUser } from "../../../prisma/CRUD/transaction/update";
import createListing from "../../../prisma/CRUD/listing/create";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case "GET": {
        if (req.query.username) {
          // Get a single user if id is provided is the query
          // api/user?username=1
          const user = await getUserByUsername(req.query.username as string);
          return res.status(200).json(user);
        } else if (req.query.email) {
          const user = await getUserByEmail(req.query.email as string);
          return res.status(200).json(user);
        } else if (req.query.address) {
          // Get a single user if id is provided is the query
          // api/user?username=1
          const isValid = await isValidAddress(req.query.address as string);
          return res.status(200).json({ state: isValid });
        } else if (req.query.addresses) {
          let arrstr: string = JSON.parse(req.query.addresses as string);
          const isValid = await isValidAddresses(arrstr.split(","));
          return res.status(200).json({ state: isValid });
        }
      }
      case "POST": {
        const session = await unstable_getServerSession(req,res,authOptions);
        if(session){
          const { customerId, description, files, price, title } = req.body;
          const listing: Listing = {
            id: "",
            customerId: customerId,
            price: price,
            title: title,
            description: description,
            files: files,
          };
          try{
            const _listing = await createListing(listing);
            console.log("user",_listing)
            return res.json(_listing);
          }catch(err){
            console.log("err listing",err)
            return res.status(403).json(err);
          }
        }else{
          return res.status(403).json({error:"Invalid session"});
        }
      }
      case "PUT": {
        if (req.headers.key === process.env.DEPOSITS_KEY) {
          if (req.query.addresses && req.query.amounts) {
            let addrstr: string = JSON.parse(req.query.addresses as string);
            let amtstr: string = JSON.parse(req.query.amounts as string);
            const addresses = addrstr.split(",");
            const amounts = amtstr.split(",");
            // ensure matching length
            let commands: Promise<boolean>[] = [];
            addresses.map((addr, index) =>
              commands.push(incrementBalance(addr, Number(amounts[index])))
            );
            let result = await Promise.all(commands);
            return res.status(200).json({ state: result });
          } else if (
            req.query.address &&
            req.query.amount &&
            req.query.txHash
          ) {
            let addrstr: string = req.query.address as string;
            let amtstr: Number = Number(req.query.amount);
            let hash: string = req.query.txHash as string;
            console.log("deposit", addrstr, amtstr, hash);
            // checks it's a valid address
            await getEthAccountByAddress(addrstr).then(async (ethAccount) => {
              // check account validity
              if (ethAccount) {
                await isTxHashRecorded(hash).then(async (isRecorded) => {
                  let result = false;
                  // checks it's a valid transaction
                  // false result either failed to record or already recorded tx
                  if (!isRecorded) {
                    // record txHash
                    await insertTxIntoUser(ethAccount.id, hash);
                    // increment balance
                    result = await incrementBalance(addrstr, amtstr as number);
                    console.log(
                      "TRANSACTIONS",
                      await getTransactionsOfEthereumAccountUsingAddress(
                        addrstr
                      )
                    );
                    return res.status(200).json({ state: result });
                  } else {
                    return res
                      .status(403)
                      .json({ error: "Already Recorded Tx" });
                  }
                });
              } else {
                return res
                  .status(403)
                  .json({ error: "Ethereum account not valid" });
              }
            });
          }
        } else {
          return res.status(401).json({ error: "unauthorized access" });
        }
      }
      case "DELETE": {
      }
    }
  } catch (error: any) {
    console.log("ERR", error);
    return res.status(500).json({ ...error, message: error.message });
  }
}