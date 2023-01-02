import { BinaryLike, createHash } from "crypto"

export const sha512 = (data:String) => {
    return createHash("sha512").update(data as BinaryLike).digest('hex')
} 
export const isString = (input:any) => typeof input == "string" 

export const onlyString = (input: String) =>
    input.toLowerCase().match(/^[a-zA-Z]+$/) !== null;
export const validEmail = (email: String) =>
    email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ) === null;
      function getObjKey(obj:Object, value:any) {
        return Object.keys(obj).find((key:String) => obj[key] === value);
      }