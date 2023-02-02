import { EthereumAccount } from "@prisma/client";
import { prisma } from "../../../utils/prisma";
import { getAddressId } from "./read";

export async function incrementBalanceWithAddress(address: string, amount: number) {
  return await getAddressId(address).then(async (res) => {
    let result: EthereumAccount | null = null;
    if (res) {
      result = await prisma.ethereumAccount.update({
        where: { id: res.id },
        data: { balance: { increment: amount } },
      });
      console.log("updated record", result);
    }
    return result != null;
  });
}
export async function incrementBalance(ethereumAccountId: string, amount: number) {
  let result = await prisma.ethereumAccount.update({
    where: { id: ethereumAccountId },
    data: { balance: { increment: amount } },
  });
  console.log("increment result",ethereumAccountId, result);
  return result != null;
}
// decrement an account balance
export async function decrementBalance(accountId: string, amount: number) {
  let result: EthereumAccount | null = null;
  result = await prisma.ethereumAccount.update({
    where: { id: accountId },
    data: { balance: { decrement: amount } },
  });
  return result != null;
}
// check address existence then increment
export async function incrementLockedBalance(
  ethereumAccountId: string,
  amount: number
) {
  let result = await prisma.ethereumAccount.update({
    where: { id: ethereumAccountId },
    data: { lockedBalance: { increment: amount } },
  });
  return result != null;
}
// check address existence then decrement
export async function decrementLockedBalance(
  ethereumAccountId: string,
  amount: number
) {
  let result = await prisma.ethereumAccount.update({
    where: { id: ethereumAccountId },
    data: { lockedBalance: { decrement: amount } },
  });
  return result != null;
}
// debits balance `fromEthAccId` with `amount0`
// credit balance `toEthAccId` with `amount1`
export async function adjustBalances(
  fromEthAccId: string,
  amount0: number,
  toEthAccId: string,
  amount1: number
) {
  if (amount0 < amount1)
    throw Error("sender balance cannot be higher than receiver!");
  await prisma.ethereumAccount
    .update({
      data: {
        balance: {
          decrement: amount0,
        },
      },
      where: {
        id: fromEthAccId,
      },
    })
    .then(async () => {
      await prisma.ethereumAccount.update({
        data: {
          balance: {
            increment: amount1,
          },
        },
        where: {
          id: toEthAccId,
        },
      });
    });
}

export async function lockBalance(customerId: string, amount: number) {
  let result = await prisma.ethereumAccount.update({
    where: { id: customerId },
    data: {
      balance: { decrement: amount },
      lockedBalance: { increment: amount },
    },
  });
  return result !== null;
}
