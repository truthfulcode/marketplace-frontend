import { FormInput, Network } from "./types";

export const login_keys: FormInput[] = [
  "U",
  "F_N",
  "L_N",
  "E",
  "P",
  "P_N",
  "U_T",
];
export const NetworksRPCs = {
  [Network.Localhost]: process.env.LOCAL_TESTNET_RPC,
  [Network.Goerli]: process.env.GOERLI_TESTNET_RPC,
  // add other valid networks
}
export const SupportedToken = {
  [Network.Localhost]: process.env.LOCAL_TOKEN_ADDRESS,
  [Network.Goerli]: process.env.GOERLI_TOKEN_ADDRESS,
  // add other valid networks
}
// select a network
export const NETWORK_OPTION = Network.Localhost;
export const titles = ["Title", "Price", "Description", "Status", "Category"];
export const keys = ["title", "price", "description", "status", "category"];
