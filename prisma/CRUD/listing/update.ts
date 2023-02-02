import { Listing, ListingStatus } from "@prisma/client";
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

export async function updateListing(listing:Listing) {
  let status : ListingStatus | null = await getListingStatus(listing.id)
  if(status !== "DRAFT") throw Error("Only draft listing can be edited!")
  if(listing.status === "COMPLETED") throw Error("Only active and draft listing status can be changed to!")
  let result = await prisma.listing.update({
    data:{
        title:listing.title,
        category:listing.category,
        description:listing.description,
        files:listing.files,
        price:listing.price,
        status:listing.status,
    },
    where:{
        id:listing.id
    }
  })
  return result;
}