"use strict";
exports.__esModule = true;
exports.Network = exports.AccountType = exports.TokenType = exports.TransactionType = exports.TransactionStatus = exports.OrderStatus = exports.ProposalStatus = exports.PaymentPage = exports.PaymentType = void 0;
var PaymentType;
(function (PaymentType) {
    PaymentType[PaymentType["Bank"] = 0] = "Bank";
    PaymentType[PaymentType["Crypto"] = 1] = "Crypto";
})(PaymentType = exports.PaymentType || (exports.PaymentType = {}));
var PaymentPage;
(function (PaymentPage) {
    PaymentPage[PaymentPage["Activity"] = 0] = "Activity";
    PaymentPage[PaymentPage["Deposit"] = 1] = "Deposit";
    PaymentPage[PaymentPage["Withdraw"] = 2] = "Withdraw";
    PaymentPage[PaymentPage["Setting"] = 3] = "Setting";
})(PaymentPage = exports.PaymentPage || (exports.PaymentPage = {}));
var ProposalStatus;
(function (ProposalStatus) {
    ProposalStatus[ProposalStatus["APPROVED"] = 0] = "APPROVED";
    ProposalStatus[ProposalStatus["PENDING"] = 1] = "PENDING";
    ProposalStatus[ProposalStatus["REJECTED"] = 2] = "REJECTED";
})(ProposalStatus = exports.ProposalStatus || (exports.ProposalStatus = {}));
var OrderStatus;
(function (OrderStatus) {
    OrderStatus[OrderStatus["SUCCESSFUL"] = 0] = "SUCCESSFUL";
    OrderStatus[OrderStatus["PENDING"] = 1] = "PENDING";
    OrderStatus[OrderStatus["CANCELLED"] = 2] = "CANCELLED";
})(OrderStatus = exports.OrderStatus || (exports.OrderStatus = {}));
var TransactionStatus;
(function (TransactionStatus) {
    TransactionStatus[TransactionStatus["COMPLETED"] = 0] = "COMPLETED";
    TransactionStatus[TransactionStatus["PENDING"] = 1] = "PENDING";
    TransactionStatus[TransactionStatus["FAILED"] = 2] = "FAILED";
})(TransactionStatus = exports.TransactionStatus || (exports.TransactionStatus = {}));
var TransactionType;
(function (TransactionType) {
    TransactionType[TransactionType["DEPOSIT"] = 0] = "DEPOSIT";
    TransactionType[TransactionType["WITHDRAW"] = 1] = "WITHDRAW";
    TransactionType[TransactionType["PAYMENT"] = 2] = "PAYMENT";
    TransactionType[TransactionType["REFUND"] = 3] = "REFUND";
})(TransactionType = exports.TransactionType || (exports.TransactionType = {}));
var TokenType;
(function (TokenType) {
    TokenType[TokenType["DAI"] = 0] = "DAI";
    TokenType[TokenType["USDT"] = 1] = "USDT";
    TokenType[TokenType["USDC"] = 2] = "USDC";
})(TokenType = exports.TokenType || (exports.TokenType = {}));
var AccountType;
(function (AccountType) {
    AccountType[AccountType["CUSTOMER"] = 0] = "CUSTOMER";
    AccountType[AccountType["FREELANCER"] = 1] = "FREELANCER";
})(AccountType = exports.AccountType || (exports.AccountType = {}));
// @notice needs to update the dependencies when altered
var Network;
(function (Network) {
    Network[Network["Localhost"] = 0] = "Localhost";
    Network[Network["Goerli"] = 1] = "Goerli";
})(Network = exports.Network || (exports.Network = {}));
