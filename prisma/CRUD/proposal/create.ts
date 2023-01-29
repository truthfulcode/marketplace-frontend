import { Proposal } from "@prisma/client";
import { prisma } from "../../../utils/prisma";
import { isValidListing } from "../listing/read";
import { isAccountFreelancer } from "../user/read";

export default async function createProposal(obj: Proposal, listingId:string) {
  const { id, description, duration, freelancerId, title } = obj;
  /// @dev check that username | email is not already taken
  if (!await isValidListing(listingId))
    throw Error("only valid listingId");
  if (!await isAccountFreelancer(freelancerId))
    throw Error("only valid freelancer allowed");
  if (duration < 86400) throw Error("duration must be greater or equal to a day!");
  if (title.split(" ").length < 5)
    throw Error("title must be greater or equal to 5 words");
  
  return await prisma.listing.update({
    data:{
        proposals:{
          create:{
            description:description,
            duration:duration,
            status:"PENDING",
            title:title,
            freelancerId:freelancerId
          }
        }
    },
    where:{
      id:listingId
    }
  })
}
