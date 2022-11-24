export type TxType = "deposit" | "withdraw" | "payment" | "refund"
export type Status = "success" | "pending" | "error"
export type transaction = {
    txId: string,
    txType:TxType,
    status:Status,
    amount:number
}
export enum PaymentType {
    Bank, Crypto
} 
export enum PaymentPage {
    Activity, Deposit, Withdraw, Setting 
}