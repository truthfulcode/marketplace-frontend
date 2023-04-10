"use strict";
var _a, _b;
exports.__esModule = true;
exports.keys = exports.titles = exports.NETWORK_OPTION = exports.SupportedToken = exports.NetworksRPCs = exports.login_keys = void 0;
var types_1 = require("./types");
exports.login_keys = [
    "U",
    "F_N",
    "L_N",
    "E",
    "P",
    "P_N",
    "U_T",
];
exports.NetworksRPCs = (_a = {},
    _a[types_1.Network.Localhost] = process.env.LOCAL_TESTNET_RPC,
    _a[types_1.Network.Goerli] = process.env.GOERLI_TESTNET_RPC,
    _a);
exports.SupportedToken = (_b = {},
    _b[types_1.Network.Localhost] = process.env.LOCAL_TOKEN_ADDRESS,
    _b[types_1.Network.Goerli] = process.env.GOERLI_TOKEN_ADDRESS,
    _b);
// select a network
exports.NETWORK_OPTION = types_1.Network.Goerli;
exports.titles = ["Title", "Price", "Description", "Status", "Category"];
exports.keys = ["title", "price", "description", "status", "category"];
