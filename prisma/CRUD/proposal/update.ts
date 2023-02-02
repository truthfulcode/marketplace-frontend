import { Proposal, ProposalStatus } from "@prisma/client";
import { prisma } from "../../../utils/prisma";
import { getProposal, getProposalStatus, isValidProposal } from "./read";

// confirm an order //
export async function acceptProposal(proposalId: string) {
  let isValid = await isValidProposal(proposalId);
  if (!isValid) throw Error("Not valid proposal!");
  let proposalStatus = await getProposalStatus(proposalId);
  if (!proposalStatus) throw Error("Not active proposal!");
  let proposal = await getProposal(proposalId);
  if (proposal) {
    await prisma.proposal.update({
      where: {
        id: proposalId,
      },
      data: {
        status: "APPROVED",
      },
    });
  }
  return proposal;
}

// cancel an order //
export async function rejectProposal(proposalId: string) {
  let isValid = await isValidProposal(proposalId);
  if (!isValid) throw Error("Not valid proposal!");
  let proposalStatus = await getProposalStatus(proposalId);
  if (!proposalStatus) throw Error("Not active proposal!");
  let proposal = await getProposal(proposalId);
  if (proposal) {
    await prisma.proposal.update({
      where: {
        id: proposalId,
      },
      data: {
        status: "REJECTED",
      },
    });
  }
  return proposal;
}

export async function addProposalToFreelancer(
  proposal: Proposal,
  listingId: string
) {
  let result = await prisma.freelancer.findFirst({
    where:{
      id:proposal.id
    },
    include:{
      proposals:true
    }
  })
  let proposals = result?.proposals
  proposals?.push(proposal)
  await prisma.freelancer.update({
    where: {
      id: proposal.freelancerId,
    },
    data: {
      proposals: {
        set:proposals
      },
    },
  });
}

export async function addProposalToListing(
  proposal: Proposal,
  listingId: string
) {
  await prisma.listing.update({
    where: {
      id: listingId,
    },
    data: {
      proposals: {
        create: {
          proposalAuthor: {
            connect: {
              id: proposal.freelancerId,
            },
          },
          title: proposal.title,
          status: proposal.status,
          freelancerId: proposal.freelancerId,
          description: proposal.description,
          duration: proposal.duration,
        },
      },
    },
  });
}
