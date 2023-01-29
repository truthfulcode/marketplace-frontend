import { prisma } from "../../../utils/prisma";
// check address existence then increment

export async function insertTxIntoUser(ethAccountId: string, txHash: string) {
  await prisma.ethereumAccount.update({
    where: { id: ethAccountId },
    data: {
      Transaction: {
        create: {
          status: "COMPLETED",
          txType: "DEPOSIT",
          txHash: txHash,
        },
      },
    },
  });
}
