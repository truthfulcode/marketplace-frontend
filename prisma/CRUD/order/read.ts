import { prisma } from "../../../utils/prisma";
import { Order, OrderStatus, Submission } from "@prisma/client";

// returns null when if email is not found
export async function isValidOrder(orderId: string) {
  let result = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
  });
  return result != null;
}

export async function getOrdersByFreelancerId(
  accountId: string
) {
  let result = await prisma.freelancer.findUnique({
    where: {
      id: accountId,
    },
    include: {
      orders: true
    },
  });
  return result ? result.orders : [];
}

export async function getOrdersByCustomerId(
  accountId: string
) {
  console.log("account",accountId)
  let result = await prisma.customer.findUnique({
    where: {
      id: accountId,
    },
    include: {
      orders: true,
    },
  });
  return result ? result.orders : [];
}

export async function getOrderByTransactionId(
  txId: string
): Promise<Order | null> {
  let result = await prisma.transaction.findUnique({
    where: {
      id: txId,
    },
    select: {
      order: true,
    },
  });
  return result ? result.order : null;
}

export async function getOrderByListingId(
  listingId: string
): Promise<Order | null> {
  let result = await prisma.listing.findUnique({
    where: {
      id: listingId,
    },
    select: {
      order: true,
    },
  });
  return result ? result.order : null;
}

export async function getOrderBySubmissionId(
  submissionId: string
): Promise<Submission | null> {
  let result = await prisma.submission.findUnique({
    where: {
      id: submissionId,
    },
  });
  return result ? result : null;
}

export async function getOrderStatus(
  orderId: string
): Promise<OrderStatus | null> {
  let result = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
    select: {
      status: true,
    },
  });
  return result ? result.status : null;
}

export async function getOrder(orderId: string): Promise<Order | null> {
  let result = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
  });
  return result ? result : null;
}

export async function getSubmission(submissionId: string): Promise<Submission | null> {
  let result = await prisma.submission.findUnique({
    where: {
      id: submissionId,
    },
  });
  console.log("submission result",result)
  return result ? result : null;
}