import { prisma } from "../../../utils/prisma";

// only delete listing if it's in a draft status
export async function deleteListing(listingId: string) {
    let result = await prisma.listing.findUnique({
        where:{
            id:listingId
        },
        select:{
            status:true
        }
    }).then(async(res)=>{
        return res?.status === "DRAFT" ? await prisma.listing.delete({
          where:{
              id:listingId,
          }
        }) : null;
    })
    return result != null;
}