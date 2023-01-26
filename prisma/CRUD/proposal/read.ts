import { prisma } from "../../../utils/prisma";
import { Proposal } from "@prisma/client";


// returns null when if email is not found
export async function isValidProposal(proposalId: string) {
    let result = await prisma.proposal.findFirst({
        where: {
            id:proposalId
        },
    });
    return result != null;
}

export async function getProposalsByListingId(listingId: string) : Promise<Proposal[]>{
  let result = await prisma.listing.findUnique({
    where: {
      id:listingId,
    },
    select: {
      proposals:true
    }
  });
  return result ? result.proposals : [];
}

export async function getProposalsByFreelancerId(accountId: string) : Promise<Proposal[]>{
  let result = await prisma.freelancer.findUnique({
    where: {
      id:accountId,
    },
    select: {
      proposals:true
    }
  });
  return result ? result.proposals : [];
}

export async function getProposal(proposalId: string) : Promise<Proposal | null> {
    let result = await prisma.proposal.findUnique({
      where: {
        id:proposalId,
      },
    });
    return result ? result : null ;
  }

