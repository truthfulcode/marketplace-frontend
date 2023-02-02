import { NextApiRequest, NextApiResponse } from "next";
import {
  getEthAccountByAddress,
  getUserByEmail,
  getUserByUsername,
  isValidAddress,
  isValidAddresses,
} from "../../../prisma/CRUD/user/read";
import { Account, Listing, Proposal, Submission } from "@prisma/client";
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
import { updateOrderSubmission } from "../../../prisma/CRUD/order/update";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case "PUT": {
        // create a new listing
        // const session = await unstable_getServerSession(req, res, authOptions);
        // if (session) {
        //   const {
        //     _submission
        //   } = req.body;
        //   const submission = _submission as Submission
        //   const _order = await updateOrderSubmission(submission.id,submission.description,submission.files);
        //   return res.status(200).json(_order);
        // } else {
        //   return res.status(403).json({ error: "Invalid session!" });
        // }
      }
    }
  } catch (error: any) {
    console.log("ERR", error);
    return res.status(500).json({ ...error, message: error.message });
  }
}
