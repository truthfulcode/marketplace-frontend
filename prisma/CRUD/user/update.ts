import { prisma } from "../../../utils/prisma";
import { getAddressId } from "./read";
// check address existence then increment
export async function incrementBalance(address: string, amount:number) {
    await getAddressId(address).then(async(res)=>{
      let result = null;
      if(res){
        result = await prisma.ethereumAccount.update({
          where:{id:res.id},
          data:{balance:{increment:amount}}
        }).then(()=>{
          console.log("updated record")
        })
      }
      return result != null;
    })
  }
// check address existence then decrement
  export async function decrementBalance(address: string, amount:number) {
    await getAddressId(address).then(async(res)=>{
      let result = null;
      if(res){
        result = await prisma.ethereumAccount.update({
          where:{id:res.id},
          data:{balance:{decrement:amount}}
        }).then(()=>{
          console.log("updated record")
        })
      }
      return result != null;
    })
  }