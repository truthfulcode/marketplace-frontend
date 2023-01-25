import { Proposal } from "@prisma/client";
import { prisma } from "../../../utils/prisma";
import { isAccountFreelancer } from "../user/read";

export default async function createProposal(obj: Proposal) {
  const { id: listingId, status, description, duration, freelancerId, title } = obj;
  /// @dev check that username | email is not already taken
  if (!await isAccountFreelancer(freelancerId))
    throw Error("only valid customer allowed");
  if (duration < 86400) throw Error("duration must be greater or equal to a day!");
  if (title.split(" ").length < 5)
    throw Error("title must be greater or equal to 5 words");
  return await prisma.listing.update({
    data:{
        proposals:{
          create:{
            description:description,
            duration:duration,
            status:status,
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
