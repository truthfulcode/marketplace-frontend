import { prisma } from "../../../utils/prisma";
export async function incrementBalance(address: string, amount:number) {
    let result = await prisma.ethereumAccount.update({
        where:{address:address},
        data:{balance:{increment:amount}}
    });
    return result != null;
  }
  export async function decrementBalance(address: string, amount:number) {
    let result = await prisma.ethereumAccount.update({
        where:{address:address},
        data:{balance:{decrement:amount}}
    });
    return result != null;
  }