import { BinaryLike, createHash, randomBytes, createCipheriv, createDecipheriv } from "crypto";
import { BigNumber, ethers } from "ethers";
import abi from "./abi.json";
// Nodejs encryption with CTR
const algorithm = 'aes-256-cbc';
const key = randomBytes(32);
const iv = randomBytes(16);
export const sha512 = (data: String) => {
  return createHash("sha512")
    .update(data as BinaryLike)
    .digest("hex");
};

export const isString = (input: any) => typeof input == "string";

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
interface Hash {
  iv:String;
  encryptedData:String
}
export const encrypt = (text: String) => {
  console.log(key)
  console.log(iv)
  let cipher = createCipheriv('aes-256-cbc', Buffer.from(key), iv);
 let encrypted = cipher.update(text as BinaryLike);
 encrypted = Buffer.concat([encrypted, cipher.final()]);
 return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
};

export const decrypt = (hash: Hash) => {
  let iv = Buffer.from(hash.iv, 'hex');
 let encryptedText = Buffer.from(hash.encryptedData, 'hex');
 let decipher = createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
 let decrypted = decipher.update(encryptedText);
 decrypted = Buffer.concat([decrypted, decipher.final()]);
 return decrypted.toString();
};

// for crypto library
const provider = () => {
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