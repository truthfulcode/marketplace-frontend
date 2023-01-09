import { Proposal } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../utils/prisma";
import { title } from "process";

export default async function createProposal(obj: Proposal) {
  const { title, description, duration, status } = obj;
  if (typeof title !== "string") throw Error("invalid username");
  if (typeof description !== "string") throw Error("invalid username");

  try {
    await prisma.proposal.create({
      data: {
        title: title,
        description: description,
        duration: duration,
        status: status,
        freelancerId: "",
      },
    });
  } catch (err) {}
}
