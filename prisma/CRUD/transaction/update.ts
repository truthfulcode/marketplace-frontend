import { TransactionType } from "@prisma/client";
import { prisma } from "../../../utils/prisma";
// check address existence then increment

export async function insertTxIntoUser(txType:TransactionType, ethAccountId: string, txHash: string, amount:number) {
  await prisma.ethereumAccount.update({
    where: { id: ethAccountId },
    data: {
      Transaction: {
        create: {
          amount:amount,
          status: "COMPLETED",
          txType: txType === "DEPOSIT" ? "DEPOSIT" : "WITHDRAW",
          txHash: txHash,
        },
      },
    },
  });
}
