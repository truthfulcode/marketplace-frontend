import { Proposal } from "@prisma/client";
import { prisma } from "../../../utils/prisma";
import { isValidListing } from "../listing/read";
import { isAccountFreelancer } from "../user/read";
import { addProposalToFreelancer, addProposalToListing } from "./update";

export default async function createProposal(obj: Proposal, listingId: string) {
  const { description, duration, freelancerId, title } = obj;
  /// @dev check that username | email is not already taken
  if (!(await isValidListing(listingId))) throw Error("only valid listingId");
  if (!(await isAccountFreelancer(freelancerId)))
    throw Error("only valid freelancer allowed");
  if (duration < 86400)
    throw Error("duration must be greater or equal to a day!");
  if (title.split(" ").length < 5)
    throw Error("title must be greater or equal to 5 words");

  let proposal = await prisma.proposal.create({
    data: {
      description: description,
      duration: duration,
      status: "PENDING",
      title: title,
      freelancerId: freelancerId,
    },
  });
  await addProposalToListing(proposal, listingId)
  await addProposalToFreelancer(proposal, listingId)
  return proposal
}
