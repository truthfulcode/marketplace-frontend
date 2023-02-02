import { prisma } from "../../../utils/prisma";
import { Listing, ListingStatus, Proposal } from "@prisma/client";


// returns null when if email is not found
export async function isValidListing(listingId: string) {
    let result = await prisma.listing.findFirst({
        where: {
            id:listingId
        },
    });
    return result != null;
}

export async function getCustomerListings(customerId: string) : Promise<Listing[]>{
  let result = await prisma.customer.findUnique({
    where: {
      id:customerId,
    },
    select: {
      listings:true
    }
  });
  return result ? result.listings : [];
}

export async function getListingCustomerId(listingId: string) : Promise<string | null>{
  let result = await prisma.listing.findFirst({
    where: {
      id:listingId
    },
    select: {
      customerId:true
    }
  });
  return result ? result.customerId : null;
}

export async function getListingsBySerachQuery(searchQuery: string) : Promise<Listing[] | null>{
  let result = await prisma.listing.findMany({
    where: {
      title:{
        contains:searchQuery
      },
      status:"ACTIVE"
    },
  });
  return result ? result : null;
}

export async function getListingStatus(listingId: string) : Promise<ListingStatus | null>{
  let result = await prisma.listing.findUnique({
    where:{
      id:listingId
    },
    select:{
      status:true
    }
  })
  return result ? result.status : null;
}
export async function getListing(listingId: string) : Promise<Listing | null> {
    let result = await prisma.listing.findUnique({
      where: {
        id:listingId,
      },
    });
    return result ? result : null ;
  }

  export async function getListingByOrderId(orderId: string) : Promise<Listing | null> {
    let result = await prisma.order.findUnique({
      where: {
        id:orderId,
      },
      select:{
        listing:true
      }
    });
    return result ? result.listing : null ;
  }

  export async function getListingByProposalId(proposalId: string) : Promise<Listing | null> {
    let result = await prisma.proposal.findUnique({
      where: {
        id:proposalId,
      },
      select:{
        listing:true
      }
    });
    return result ? result.listing : null ;
  }

  export async function getListingsAppliedByFreelancer(freelancerId: string) : Promise<Listing[] | null>{
    let result = await prisma.listing.findMany({
      where:{
        proposals:{
          some:{
            freelancerId:freelancerId
          }
        }
      },
    })
    return result ? result : null;
  }