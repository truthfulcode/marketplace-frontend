import { NextApiRequest, NextApiResponse } from "next";
import {
  getBalance,
  getEthAccountByAddress,
  getUserByEmail,
  getUserByUsername,
  isValidAddress,
  isValidAddresses,
} from "../../../prisma/CRUD/user/read";
import { Account, Prisma } from "@prisma/client";
import createUser from "../../../prisma/CRUD/user/create";
import {
  decrementBalance,
  incrementBalance,
} from "../../../prisma/CRUD/user/update";
import {
  decrypt,
  encrypt,
  getUSDCBalance,
  transfer,
  transferAll,
  transferETHForGas,
} from "../../../utils/helpers";
import { RSC_MODULE_TYPES } from "next/dist/shared/lib/constants";
import {
  getTransactionsOfEthereumAccountUsingAddress,
  isTxHashRecorded,
} from "../../../prisma/CRUD/transaction/read";
import { insertTxIntoUser } from "../../../prisma/CRUD/transaction/update";
import { BigNumber } from "ethers";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { isAddress } from "ethers/lib/utils";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await unstable_getServerSession(req, res, authOptions);
    switch (req.method) {
      case "GET": {
        if (req.query.username) {
          // Get a single user if id is provided is the query
          // api/user?username=1
          const user = await getUserByUsername(req.query.username as string);
          return res.status(200).json(user);
        } else if (req.query.email) {
          const user = await getUserByEmail(req.query.email as string);
          return res.status(200).json(user);
        } else if (req.query.address) {
          // Get a single user if id is provided is the query
          // api/user?username=1
          const isValid = await isValidAddress(req.query.address as string);
          return res.status(200).json({ state: isValid });
        } else if (req.query.addresses) {
          let arrstr: string = JSON.parse(req.query.addresses as string);
          const isValid = await isValidAddresses(arrstr.split(","));
          return res.status(200).json({ state: isValid });
        }
      }
      case "POST": {
        const {
          username,
          firstName,
          lastName,
          email,
          password,
          phoneNumber,
          accountType,
        } = req.body;
        console.log("pass", password);
        const account: Account = {
          id: "",
          username: username,
          email: email,
          firstName: firstName,
          lastName: lastName,
          password: password,
          phoneNumber: phoneNumber,
          accountType: accountType,
          userId: "",
          expires_at: 0,
          access_token: "",
          session_state: "",
          id_token: "",
          scope: "",
          refresh_token: "",
          token_type: "",
          provider: "",
          providerAccountId: "",
          type: "",
        };
        const user = await createUser(account);
        return res.json(user);
      }
      case "PUT": {
        if (req.headers.key === process.env.DEPOSITS_KEY) {
          if (req.query.addresses && req.query.amounts) {
            let addrstr: string = JSON.parse(req.query.addresses as string);
            let amtstr: string = JSON.parse(req.query.amounts as string);
            const addresses = addrstr.split(",");
            const amounts = amtstr.split(",");
            // ensure matching length
            let commands: Promise<boolean>[] = [];
            addresses.map((addr, index) =>
              commands.push(incrementBalance(addr, Number(amounts[index])))
            );
            let result = await Promise.all(commands);
            return res.status(200).json({ state: result });
          } else if (
            req.query.address &&
            req.query.amount &&
            req.query.txHash
          ) {
            let addrstr: string = req.query.address as string;
            let amtstr: Number = Number(req.query.amount);
            let hash: string = req.query.txHash as string;
            // checks it's a valid address
            await getEthAccountByAddress(addrstr).then(async (ethAccount) => {
              // check account validity
              if (ethAccount) {
                await isTxHashRecorded(hash).then(async (isRecorded) => {
                  let result = false;
                  // checks it's a valid transaction
                  // false result either failed to record or already recorded tx
                  if (!isRecorded) {
                    // record txHash
                    await insertTxIntoUser(
                      "DEPOSIT",
                      ethAccount.id,
                      hash,
                      amtstr as number
                    );
                    // increment balance
                    result = await incrementBalance(addrstr, amtstr as number);
                    await getUSDCBalance(ethAccount.address).then(
                      async (balance) => {
                        console.log("user's USDC balance:", Number(balance));
                        if (result)
                          console.log(`${addrstr} deposited ${amtstr}`);
                        if (result && balance.gt(10e6)) {
                          // if balance is greater than 10 USDC
                          // deposit ETH to the address
                          let ethTransfer = await transferETHForGas(
                            process.env.MAIN_PK as string,
                            ethAccount.address
                          );
                          await ethTransfer.wait().then(async (tx) => {
                            console.log("eth transfer done");
                            // send USDC out the address on confirmation of the latter
                            let pk = decrypt({
                              iv: ethAccount.iv,
                              encryptedData: ethAccount.encryptedData,
                            });
                            let _transfer = await transfer(
                              pk,
                              balance,
                              process.env.MAIN_ADDRESS as string
                            );

                            await _transfer.wait().then(() => {
                              console.log("transfer USDC done");
                            });
                          });
                        }
                      }
                    );
                    return res.status(200).json({ state: result });
                  } else {
                    return res
                      .status(403)
                      .json({ error: "Already Recorded Tx" });
                  }
                });
              } else {
                return res
                  .status(403)
                  .json({ error: "Ethereum account not valid" });
              }
            });
          }
          // withdraw
        } else if (session) {
          if(!req.body.destination) throw Error("unprovided destination!")
          if(!req.body.amount) throw Error("unprovided amount!")
          let addrstr: string = req.body.destination as string;
          let amtstr: string = req.body.amount as string;
          let senderAccountId = (session?.user as Account).id;
          // validate the inputs
          let balance = await getBalance(senderAccountId);
          balance = balance ? balance : 0;
          if (balance < Number(amtstr)) throw Error("insufficient balance!");
          if (!isAddress(addrstr)) throw Error("invalid withdraw address!");
          let withdrawTx = await transfer(
            process.env.MAIN_PK as string,
            BigNumber.from(amtstr),
            addrstr
          );
          let receipt = await withdrawTx.wait();
          console.log("receipt", receipt);
          if (receipt.status === 1) {
            console.log("insert",await insertTxIntoUser(
              "WITHDRAW",
              senderAccountId,
              receipt.transactionHash,
              Number(amtstr)
            ));
            console.log("decrement",await decrementBalance(senderAccountId, Number(amtstr)));
            return res.status(200).json({ state: "successful" });
          }
        } else {
          return res.status(401).json({ error: "unauthorized access" });
        }
      }
      case "DELETE": {
      }
    }
  } catch (error: any) {
    console.log("ERR", error);
    return res.status(500).json({ ...error, message: error.message });
  }
}
