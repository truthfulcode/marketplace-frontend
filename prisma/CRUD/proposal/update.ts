import { prisma } from "../../../utils/prisma";
import { getProposal, getProposalStatus, isValidProposal } from "./read";

// confirm an order //
export async function acceptProposal(proposalId: string) {
  let isValid = await isValidProposal(proposalId)
  if(!isValid) throw Error("Not valid proposal!");
  let proposalStatus = await getProposalStatus(proposalId);
  if(!proposalStatus) throw Error("Not active proposal!");
  let proposal = await getProposal(proposalId);
  if(proposal){
    await prisma.proposal.update({
      where:{
        id:proposalId
      },
      data:{
        status:"APPROVED"
      }
    })
  }
  return proposal;
}

// cancel an order //
export async function rejectProposal(proposalId: string) {
  let isValid = await isValidProposal(proposalId)
  if(!isValid) throw Error("Not valid proposal!");
  let proposalStatus = await getProposalStatus(proposalId);
  if(!proposalStatus) throw Error("Not active proposal!");
  let proposal = await getProposal(proposalId);
  if(proposal){
    await prisma.proposal.update({
      where:{
        id:proposalId
      },
      data:{
        status:"REJECTED"
      }
    })
  }
  return proposal;
}
