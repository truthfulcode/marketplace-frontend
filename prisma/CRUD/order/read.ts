import { prisma } from "../../../utils/prisma";
import { Order, Submission } from "@prisma/client";


// returns null when if email is not found
export async function isValidOrder(orderId: string) {
    let result = await prisma.order.findUnique({
        where: {
            id:orderId
        },
    });
    return result != null;
}

export async function getOrdersByAccountId(accountId: string) : Promise<Order[]>{
  let result = await prisma.account.findUnique({
    where: {
      id:accountId,
    },
    select: {
      orders:true
    }
  });
  return result ? result.orders : [];
}

export async function getOrderByTransactionId(txId: string) : Promise<Order | null>{
  let result = await prisma.transaction.findUnique({
    where: {
      id:txId,
    },
    select: {
      order:true
    }
  });
  return result ? result.order : null;
}

export async function getOrderByListingId(listingId: string) : Promise<Order | null>{
  let result = await prisma.listing.findUnique({
    where: {
      id:listingId,
    },
    select: {
      order:true
    }
  });
  return result ? result.order : null;
}

export async function getOrderBySubmissionId(submissionId: string) : Promise<Submission | null> {
  let result = await prisma.submission.findUnique({
    where: {
      id:submissionId,
    },
  });
  return result ? result : null ;
}

export async function getOrder(orderId: string) : Promise<Order | null> {
    let result = await prisma.order.findUnique({
      where: {
        id:orderId,
      },
    });
    return result ? result : null ;
  }

