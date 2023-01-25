import { Transaction, TransactionStatus, TransactionType } from "@prisma/client";
import { prisma } from "../../../utils/prisma";
// check address existence then increment

export async function insertTxIntoUser(
  ethAccountId: string,
  txHash: string
) {
  // create tx
  
    // get all txs for `address`
          await prisma.ethereumAccount.update({
            where:{id:ethAccountId},
            data:{
              Transaction:{
                create:{
                  status: "COMPLETED",
                  txType: "DEPOSIT",
                  txHash: txHash,
                }
              }
            }
          })

}

async function getEthereumAccount(address: string) {
  return await prisma.ethereumAccount.findFirst({
    where: {
      address: address,
    },
    select: { id: true, Transaction: true, account:true },
  });
}
