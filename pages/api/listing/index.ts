import { NextApiRequest, NextApiResponse } from "next";
import {
  getEthAccountByAddress,
  getUserByEmail,
  getUserByUsername,
  isValidAddress,
  isValidAddresses,
} from "../../../prisma/CRUD/user/read";
import { Account, Listing, Proposal } from "@prisma/client";
import { incrementBalance, lockBalance } from "../../../prisma/CRUD/user/update";
import {
  getTransactionsOfEthereumAccountUsingAddress,
  isTxHashRecorded,
} from "../../../prisma/CRUD/transaction/read";
import { insertTxIntoUser } from "../../../prisma/CRUD/transaction/update";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import createProposal from "../../../prisma/CRUD/proposal/create";
import { create } from "domain";
import createListing from "../../../prisma/CRUD/listing/create";
import {
  getCustomerListings,
  getListing,
} from "../../../prisma/CRUD/listing/read";
import { updateListing } from "../../../prisma/CRUD/listing/update";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case "GET": {
        const session = await unstable_getServerSession(req, res, authOptions);
        if (session) {
          if (req.query.list) {
            // get list of listings
            const userId = (session.user as Account).id;
            const result = await getCustomerListings(userId);
            return res.status(200).json(result);
          } else if (req.query.listingId && req.query.listing) {
            // get a certain listing
            const listingId = req.query.listingId;
            const result = getListing(listingId as string);
            return res.status(200).json(result);
          } else {
            return res.status(404).json({ error: "invalid query" });
          }
        } else {
          return res.status(401).json({ error: "Invalid session!" });
        }
      }
      case "POST": {
        // create a new listing
        const session = await unstable_getServerSession(req, res, authOptions);
        if (session) {
          const {
            id,
            status,
            description,
            price,
            category,
            customerId,
            files,
            title,
          } = req.body;
          const listing: Listing = {
            id: "",
            price: price,
            category: category,
            customerId: customerId,
            files: files,
            description: description,
            status: status,
            title: title,
          };
          const _listing = await createListing(listing);
          console.log("listing", _listing);
          return res.json(_listing);
        } else {
          return res.status(403).json({ error: "Invalid session!" });
        }
      }
      case "PUT": {
        const session = await unstable_getServerSession(req, res, authOptions);
        if (session) {
          if (req.body.listing) {
            let customerId = (session.user as Account).id
            if((session.user as Account).accountType !== "CUSTOMER") throw Error("invalid access for only customer!")
            let listing : Listing = req.body.listing as Listing
            console.log("listing",listing)
            let result = await updateListing(listing);
            if(listing.status === "ACTIVE"){
              await lockBalance(customerId,listing.price)
            }
            return res.status(200).json({ state: result });
          }
          // else if (
          //   req.query.address &&
          //   req.query.amount &&
          //   req.query.txHash
          // ) {
          //   let addrstr: string = req.query.address as string;
          //   let amtstr: Number = Number(req.query.amount);
          //   let hash: string = req.query.txHash as string;
          //   console.log("deposit", addrstr, amtstr, hash);
          //   // checks it's a valid address
            
          // }
        } else {
          return res.status(401).json({ error: "Invalid session!" });
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
