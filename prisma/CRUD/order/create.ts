import { Listing, ListingCategory, Order } from "@prisma/client";
import { increaseTime } from "../../../utils/helpers";
import { prisma } from "../../../utils/prisma";
import { confirmListing } from "../listing/update";
import { getProposal } from "../proposal/read";
import { isAccountCustomer } from "../user/read";

// confirm listing - create order
export default async function createOrder(
  obj: Order,
  listingId: string,
  proposalId: string
) {
  const { customerId, freelancerId, price, } = obj;
  /// @dev check that username | email is not already taken
  let keys = Object.keys(ListingCategory);
  if (!(await isAccountCustomer(customerId)))
    throw Error("only valid customer allowed");
  if (price < 5) throw Error("Price must be greater or equal to 5$!");
  return await confirmListing(listingId).then(async (listing) => {
    return await getProposal(proposalId).then(async (proposal) => {
      return await prisma.order.create({
        data: {
          price: price,
          status: "PENDING",
          createdAt: new Date(),
          endsAt: increaseTime(proposal?.duration ? proposal?.duration : 86400),
          listing: {
            connect: {
              id: listingId,
            },
          },
          orderFreelancer:{
            connect:{
              id:freelancerId
            }
          },
          orderCustomer:{
            connect:{
              id:customerId
            }
          }
        },
      });
    });
  });
}
