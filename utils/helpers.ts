import { BinaryLike, createHash } from "crypto"

export const sha512 = (data:String) => {
    return createHash("sha512").update(data as BinaryLike).digest('hex')
} 
export const isString = (input:any) => typeof input == "string" 