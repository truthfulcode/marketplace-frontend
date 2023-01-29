import { prisma } from "../../../utils/prisma";
import { getListingStatus } from "./read";
// import { getAddressId } from "./read";

export async function confirmListing(listingId:string) {
  if((await getListingStatus(listingId)) !== "ACTIVE") throw Error("Not active listing!")
  let result = await prisma.listing.update({
    data:{
        status:"COMPLETED"
    },
    where:{
        id:listingId
    }
  })
  return result;
}