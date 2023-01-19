import { BinaryLike, createHash, randomBytes, createCipheriv, createDecipheriv } from "crypto";
import { BigNumber, ethers } from "ethers";
import abi from "./abi.json";
import { EthereumAccount } from "./types";

export const sha512 = (data: String) => {
  return createHash("sha512")
    .update(data as BinaryLike)
    .digest("hex");
};

export const isString = (input: any) => typeof input == "string";
export const defaultAccount = {E:{value:undefined, error:undefined},F_N:{value:undefined, error:undefined},L_N:{value:undefined, error:undefined},P:{value:undefined, error:undefined},P_N:{value:undefined, error:undefined},U:{value:undefined, error:undefined},U_T:{value:undefined, error:undefined}}
export const onlyString = (input: String) =>
  input.toLowerCase().match(/^[a-zA-Z]+$/) !== null;
export const validEmail = (email: String) =>
  email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ) !== null;
// generate a random ethereum address
export const generatePK = () => {
  return ethers.Wallet.createRandom();
};
export const generateAndHashPK = () : EthereumAccount => {
  const pk = generatePK();
  const encryptedData = encrypt(pk.privateKey)
  return {address:pk.address, encryptedData:encryptedData.encryptedData, iv:encryptedData.iv, balance:0}
}
interface Hash {
  iv:String;
  encryptedData:String
}

const convertHexToArrayBytes = (hex : String) => {
  let res = [];
  for(let i = 0; i < hex.length; i += 2){
    res.push(parseInt(hex.substring(i,i+2),16))
  }
  console.log(res)
  return res;
}
const fromBufferToString = (buffer : Buffer) : string => {
  return buffer.toString('hex');
}
const fromStringToBuffer = (str: String) : Buffer => {
  return Buffer.from(convertHexToArrayBytes(str));
}
// only can be used in server-side
export const encrypt = (text: String) => {
  const key : Buffer = fromStringToBuffer(process.env.ENCRYPTION_KEY as string)
  const iv : Buffer = fromStringToBuffer(process.env.ENCRYPTION_IV as string)
  console.log("key",fromBufferToString(key))
  console.log("iv",fromBufferToString(iv))
  let cipher = createCipheriv('aes-256-cbc', key, iv);
 let encrypted = cipher.update(text as BinaryLike);
 encrypted = Buffer.concat([encrypted, cipher.final()]);
 return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
};
// only can be used in server-side
export const decrypt = (hash: Hash) => {
  const key : Buffer = fromStringToBuffer(process.env.ENCRYPTION_KEY as string)
  let iv = Buffer.from(hash.iv, 'hex');
 let encryptedText = Buffer.from(hash.encryptedData, 'hex');
 let decipher = createDecipheriv('aes-256-cbc', key, iv);
 let decrypted = decipher.update(encryptedText);
 decrypted = Buffer.concat([decrypted, decipher.final()]);
 return decrypted.toString();
};

// for crypto library
export const provider = () => {
  return new ethers.providers.AlchemyProvider("goerli",process.env.GOERLI_TESTNET);
}

// reads the token balance, it doesn't need a signer
export const balanceOf = async (address: string) => {

  const contract = new ethers.Contract(process.env.TOKEN_ADDRESS as string, abi);

  return await contract.balanceOf(address);
}

// performs a token transfer, it does need a signer
export const transfer = async (pk: string, amount:BigNumber, destinationAddress:string) => {
  
  const signer = new ethers.Wallet(pk, provider());

  const contract = new ethers.Contract(process.env.TOKEN_ADDRESS as string, abi,signer);

  return await contract.transfer(destinationAddress, amount);
}