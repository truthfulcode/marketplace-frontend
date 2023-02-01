import { Submission } from "@prisma/client";
import { prisma } from "../../../utils/prisma";
import { getAddressId } from "../user/read";
import { decrementLockedBalance, incrementBalance } from "../user/update";
import { getOrder, getOrderStatus, isValidOrder } from "./read";

// update order submission description
export async function updateOrderSubmission(
  orderId: string,
  description: string,
  updatedFiles: string[]
) {
  let result = await prisma.submission.update({
    where: {
      id: orderId,
    },
    data: {
      description: description,
      files: updatedFiles,
    },
  });
  return result !== null;
}

// confirm an order //
export async function confirmOrder(orderId: string) {
  let isValid = await isValidOrder(orderId);
  if (!isValid) throw Error("Not valid order!");
  let orderStatus = await getOrderStatus(orderId);
  if (!orderStatus) throw Error("Not active order!");
  let order = await getOrder(orderId);
  if (order) {
    await decrementLockedBalance(order.customerId, order.price);
    await incrementBalance(order.freelancerId, order.price);
    await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        status: "SUCCESSFUL",
      },
    });
  }
  return order;
}

// cancel an order //
export async function cancelOrder(orderId: string) {
  let isValid = await isValidOrder(orderId);
  if (!isValid) throw Error("Not valid order!");
  let orderStatus = await getOrderStatus(orderId);
  if (!orderStatus) throw Error("Not active order!");
  let order = await getOrder(orderId);
  if (order) {
    await decrementLockedBalance(order.customerId, order.price);
    await incrementBalance(order.customerId, order.price);
    await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        status: "CANCELLED",
      },
    });
  }
  return order;
}