import { NextApiRequest, NextApiResponse } from "next";
import { Account, Listing, Proposal, Submission } from "@prisma/client";
import { authOptions } from "../auth/[...nextauth]";
import createListing from "../../../prisma/CRUD/listing/create";
import { updateOrderSubmission } from "../../../prisma/CRUD/order/update";
import { unstable_getServerSession } from "next-auth";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
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
          return res.status(200).json(_listing);
        } else {
          return res.status(403).json({ error: "Invalid session!" });
        }
      }
      case "PUT": {
        // create a new listing
        const session = await unstable_getServerSession(req, res, authOptions);
        if (session) {          
          const submission = req.body as Submission
          const orderId = submission.id;
          const _order = await updateOrderSubmission(orderId,submission.description,submission.files);
          return res.status(200).json(_order);
        } else {
          return res.status(403).json({ error: "Invalid session!" });
        }
      }
    }
  } catch (error: any) {
    console.log("ERR", error);
    return res.status(500).json({ ...error, message: error.message });
  }
}
