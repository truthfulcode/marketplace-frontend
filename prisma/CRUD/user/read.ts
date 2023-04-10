import { prisma } from "../../../utils/prisma";
import { sha512, validEmail } from "../../../utils/helpers";

export async function getAddressId(address: string){
  let result = await prisma.ethereumAccount.findFirst({
    where: {
      address:address
    },
    select: {
      id : true
    }
  });
  return result ? result : null;
}

export async function getBalance(accountId: string){
  let result = await prisma.ethereumAccount.findUnique({
    where: {
      id:accountId
    },
    select: {
      balance : true
    }
  });
  return result ? result.balance : null;
}

export async function getAddressByCustomerId(customerId: string){
  let result = await prisma.ethereumAccount.findUnique({
    where: {
      id:customerId
    },
    select: {
      address:true
    }
  });
  return result ? result.address : null;
}

export async function isValidUsername(username: string) {
  let result = await prisma.account.findFirst({
    where: {
      username: username,
    },
  });
  return result != null;
}
// returns null when if email is not found
export async function isValidEmail(email: string) {
  let result = await prisma.account.findFirst({
    where: {
      email: email,
    },
  });
  return result != null;
}
// returns null when if username or email is not found
export async function isValidUsernameOrEmail(username: string, email: string) {
  let result = await prisma.account.findFirst({
    where: {
      OR: [{ email: email }, { username: username }],
    },
  });
  return result != null;
}
// returns null when if username or email is not found
export async function getUser(input: string, password:string) {
  let res;
  if(validEmail(input)){
    res = await prisma.account.findUnique({
      where: { email : input},
    })
  }else{
    res = await prisma.account.findUnique({
      where: { username : input},
    })
  }
  console.log("result user",res, sha512(password));
  return res && res.password === sha512(password) ? res : null;    
}
// returns null when username is not found
export async function getUserByUsername(username: string) {
  let result = await prisma.account.findUnique({
    where: {
      username: username,
    },
  });
  return result;
}
// returns null when email is not found
export async function getUserByEmail(email: string) {
  let result = await prisma.account.findUnique({
    where: {
      email: email,
    },
  });
  return result;
}
// returns null when not found user
export async function authenticateUser(
  emailOrUsername: string,
  password: string
) {
  let isEmail = emailOrUsername.includes("@");
  let result = await prisma.account.findFirst({
    where: isEmail
      ? {
          email: emailOrUsername,
        }
      : {
          username: emailOrUsername,
        },
  });
  return result;
}
export async function getEthAccountByAddress(address: string) {
    let result = await prisma.ethereumAccount.findFirst({
      where: {
        address:address,
      },
    });
    return result;
}
export async function isValidAddress(address: string) {
  try {
    let result = await prisma.ethereumAccount.findFirst({
      where: {
        address:address,
      },
    });
    return result != null;
  }catch(err){
    console.log(err);
    return false;
  }
}
export async function isValidAddresses(addresses: string[]) {
  try {
    let result = await prisma.ethereumAccount.findMany({
      where: {
        address:{in:addresses},
      },
      select:{address:true}
    })
    let validAddresses: string[] = [];
    result.map((val)=>{
      validAddresses.push(val.address);
    })
    return validAddresses;
  }catch(err){
    console.log(err);
    return false;
  }
}
export async function getCustomerIdByAccountId(accountId: string) {
  let result = await prisma.customer.findFirst({
    where: {
      account:{
        id:accountId
      }
    },
    select:{
      id:true
    }
  });
  return result;
}
export async function getFreelancerIdByAccountId(accountId: string) {
  let result = await prisma.freelancer.findFirst({
    where: {
      account:{
        id:accountId
      }
    },
    select:{
      id:true
    }
  });
  return result;
}
export async function isAccountCustomer(accountId: string) {
  let result = await prisma.customer.findFirst({
    where: {
      account:{
        id:accountId
      }
    },
  });
  return result != null;
}
export async function isAccountFreelancer(accountId: string) {
  let result = await prisma.freelancer.findFirst({
    where: {
      account:{
        id:accountId
      }
    },
  });
  return result != null;
}