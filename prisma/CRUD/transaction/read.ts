import { prisma } from "../../../utils/prisma";
export async function isTxHashRecorded(txHash: string){
  let result = await prisma.transaction.findUnique({
    where: {
      txHash:txHash
    }
  });
  return result != null;
}
export async function getTransactionsOfEthereumAccountUsingId(id: string){
  return await prisma.transaction.findMany({where:{account:{id:id}}})
}
export async function getTransactionsOfEthereumAccountUsingAddress(address: string){
  return await prisma.transaction.findMany({where:{account:{address:address}}})
}