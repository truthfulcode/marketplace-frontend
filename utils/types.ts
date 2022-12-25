export type TxType = "deposit" | "withdraw" | "payment" | "refund"
export type Status = "success" | "pending" | "error"
export type FormInput =
  | "USERNAME"
  | "FIRST_NAME"
  | "LAST_NAME"
  | "EMAIL"
  | "PASSWORD"
  | "PHONE_NUMBER"
  | "USER_TYPE";
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
export enum ProposalStatus {APPROVED,PENDING,REJECTED}
export enum OrderStatus {SUCCESSFUL,PENDING,CANCELLED}
export enum TransactionStatus {COMPLETED,PENDING,FAILED}
export enum TransactionType {DEPOSIT,WITHDRAW,PAYMENT,REFUND}
export enum TokenType {DAI,USDT,USDC}
export enum AccountType{ CUSTOMER, FREELANCER }
