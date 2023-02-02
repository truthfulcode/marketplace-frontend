import { NextApiRequest, NextApiResponse } from "next";
import {
  getEthAccountByAddress,
  getUserByEmail,
  getUserByUsername,
  isValidAddress,
  isValidAddresses,
} from "../../../prisma/CRUD/user/read";
import { Account, Order, Proposal } from "@prisma/client";
import { incrementBalance } from "../../../prisma/CRUD/user/update";
import {
  getTransactionsOfEthereumAccountUsingAddress,
  isTxHashRecorded,
} from "../../../prisma/CRUD/transaction/read";
import { insertTxIntoUser } from "../../../prisma/CRUD/transaction/update";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import createProposal from "../../../prisma/CRUD/proposal/create";
import { confirmListing } from "../../../prisma/CRUD/listing/update";
import createOrder from "../../../prisma/CRUD/order/create";
import { increaseTime } from "../../../utils/helpers";
import { getProposal } from "../../../prisma/CRUD/proposal/read";
import { getListing } from "../../../prisma/CRUD/listing/read";
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
        const session = await unstable_getServerSession(req, res, authOptions);
        if (session) {
          const {
            id: listingId,
            status,
            description,
            duration,
            freelancerId,
            title,
          } = req.body;
          const proposal: Proposal = {
            id: "",
            description: description,
            duration: duration,
            status: status,
            title: title,
            freelancerId: freelancerId,
          };
          try {
            const _proposal = await createProposal(proposal, listingId);
            console.log("proposal", _proposal);
            return res.json(_proposal);
          } catch (err) {
            console.log("err listing", err);
            return res.status(403).json(err);
          }
        } else {
          return res.status(403).json({ error: "Invalid session" });
        }
      }
      case "PUT": {
        const session = await unstable_getServerSession(req, res, authOptions);
        if (session) {
          console.log("req", req.body.proposalId, req.body.listingId);
          if (req.body.proposalId && req.body.listingId) {
            let proposalId = req.body.proposalId as string;
            let listingId = req.body.listingId as string;
            let customerId = (session.user as Account).id;
            let proposal = await getProposal(proposalId);
            let listing = await getListing(listingId);
            if (listing?.customerId !== customerId)
              Error("only valid customer can access!");
            if (listing?.status !== "ACTIVE") Error("Inactive listing!");
            if (proposal?.status !== "PENDING")
              Error("invalid proposal status!");
            let duration = proposal?.duration as number;
            console.log("now", new Date(), "end", increaseTime(duration));
            let order: Order = {
              id: "",
              createdAt: new Date(),
              endsAt: increaseTime(duration),
              customerId: customerId,
              freelancerId: proposal?.freelancerId as string,
              price: listing?.price as number,
              status: "ACTIVE",
            };
            let result = await createOrder(order, listingId, proposalId);
            res.status(200).json(result);
          }
        } else {
          return res.status(401).json({ error: "unauthorized access" });
        }
      }
    }
  } catch (error: any) {
    console.log("ERR", error);
    return res.status(500).json({ ...error, message: error.message });
  }
}
