import { Listing, ListingCategory, Order } from "@prisma/client";
import { increaseTime } from "../../../utils/helpers";
import { prisma } from "../../../utils/prisma";
import { confirmListing } from "../listing/update";
import { getProposal } from "../proposal/read";
import { acceptProposal } from "../proposal/update";
import { isAccountCustomer } from "../user/read";

// confirm listing - create order
export default async function createOrder(
  obj: Order,
  listingId: string,
  proposalId: string
) {
  const { customerId, freelancerId, price } = obj;
  /// @dev check that username | email is not already taken
  if (!(await isAccountCustomer(customerId)))
    throw Error("only valid customer allowed");
  if (price < 5e6) throw Error("Price must be greater or equal to 5$!");
  return await confirmListing(listingId).then(async () => {
    await acceptProposal(proposalId);
    // reject the rest
    await prisma.proposal.updateMany({
      where: {
          AND:{
            listing: {
                id: listingId,
            },
            id:{
              not:{
                equals:proposalId
              }
            }
          }
      },
      data: {
        status:"REJECTED"
      },
    });
    return await prisma.order.create({
      data: {
        price: obj.price,
        status: "ACTIVE",
        createdAt: obj.createdAt,
        endsAt: obj.endsAt,
        listing: {
          connect: {
            id: listingId,
          },
        },
        orderFreelancer: {
          connect: {
            id: freelancerId,
          },
        },
        submission: {
          create: { description: "" },
        },
        orderCustomer: {
          connect: {
            id: customerId,
          },
        },
      },
    });
  });
}
