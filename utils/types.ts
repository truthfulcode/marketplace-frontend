export type TxType = "deposit" | "withdraw" | "payment" | "refund"
export type Status = "success" | "pending" | "error"
export type FormInput =
  | "U" // USERNAME
  | "F_N" // FIRST_NAME
  | "L_N" // LAST_NAME
  | "E" // EMAIL
  | "P" // PASSWORD
  | "P_N" // PHONE_NUMBER
  | "U_T"; // USER_TYPE
export type transaction = {
    txId: string,
    txType:TxType,
    status:Status,
    amount:number
}
export type ValueWithError = {
    value:String | undefined,
    error:String | undefined
  }
export type ValueNumberWithError = {
    value:Number | undefined,
    error:String | undefined
  }
export enum PaymentType {
    Bank, Crypto
} 
export enum PaymentPage {
    Activity, Deposit, Withdraw, Setting 
}
export enum ProposalStatus {APPROVED,PENDING,REJECTED}
export enum OrderStatus {SUCCESSFUL,PENDING,CANCELLED}
export enum TransactionStatus {COMPLETED,PENDING,FAILED}
export enum TransactionType {DEPOSIT,WITHDRAW,PAYMENT,REFUND}
export enum TokenType {DAI,USDT,USDC}
export enum AccountType{ CUSTOMER, FREELANCER }
export type EthereumAccount = {
  address:string,
  iv:string,
  encryptedData:string
  balance : number // deposited amount
}
export type AccountRegsiterState = {
  [key in FormInput] : ValueWithError | undefined
}
// @notice needs to update the dependencies when altered
export enum Network {
  Localhost, Goerli
}

