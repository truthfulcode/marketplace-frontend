"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var ethers_1 = require("ethers");
var dotenv = require("dotenv");
var abi_1 = require("./abi");
var axios_1 = require("axios");
dotenv.config();
// make sure the address is checksum
// in essence, use this "0x17fBA9Eb71F040d57d19B48A28002FfE32380DF8"
// not this "0x17fba9eb71f040d57d19b48a28002ffe32380df8"
function formatRequestAddresses(addresses) {
    var formatted = "";
    addresses.map(function (value, index) {
        if (index == addresses.length - 1) {
            formatted += value;
        }
        else {
            formatted += value + ",";
        }
    });
    return formatted;
}
function checkAddress(address) {
    return __awaiter(this, void 0, void 0, function () {
        var addr, arrStr, res, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    addr = "0x17fBA9Eb71F040d57d19B48A28002FfE32380DF8";
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    arrStr = encodeURIComponent(JSON.stringify(formatRequestAddresses([addr, "0x27fBA9Eb71F040d57d19B48A28002FfE32380DF8"])));
                    return [4 /*yield*/, axios_1["default"].get("http://localhost:3000/api/transaction?addresses=".concat(arrStr))];
                case 2:
                    res = _a.sent();
                    console.log(res.data);
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    console.log(err_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function main() {
    var _this = this;
    var provider = new ethers_1.ethers.providers.JsonRpcProvider(process.env.GOERLI_TESTNET);
    var contract = new ethers_1.ethers.Contract(process.env.TOKEN_ADDRESS, abi_1.abi, provider);
    contract.on("Transfer", function (from, to, value, event) { return __awaiter(_this, void 0, void 0, function () {
        var transferEvent;
        return __generator(this, function (_a) {
            transferEvent = {
                from: from,
                to: to,
                value: value,
                eventData: event
            };
            // check for minimum of 1 USDC
            // check `to` that it is among the receiver addresses
            // await 
            // credit 
            console.log(JSON.stringify(transferEvent, null, 4));
            return [2 /*return*/];
        });
    }); });
}
// main();
checkAddress("");
