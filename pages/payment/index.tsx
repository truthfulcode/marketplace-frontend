import { Account, AccountType, Transaction } from "@prisma/client";
import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import React from "react";
import Interface from "../../components/Payment/Interface";
import { getTransactionsOfEthereumAccountUsingId } from "../../prisma/CRUD/transaction/read";
import { getAddressByCustomerId, getBalance } from "../../prisma/CRUD/user/read";
import { PaymentPage } from "../../utils/types";
import { authOptions } from "../api/auth/[...nextauth]";

const Index = (props) => {
  const {accountType, txs} = props
  return <Interface isDeposit={accountType==="CUSTOMER"} page={PaymentPage.Activity} txs={txs} />;
};
export default Index;

export const getServerSideProps: GetServerSideProps = async (c) => {
  const session = await unstable_getServerSession(c.req, c.res, authOptions);
  let id: string | null = null;
  let accountType: string | null = null;
  let txs: Transaction[] | null = null;
  let address: string | null = null;
  let balance: number | null = 0;
  if (session) {
    id = (session?.user as Account).id;
    accountType = (session?.user as Account).accountType;
    txs = await getTransactionsOfEthereumAccountUsingId(id);
    address = await getAddressByCustomerId(id);
    balance = await getBalance(id);
  }
  return session
    ? {
        props: {
          accountId: id,
          accountType: accountType,
          txs: JSON.stringify(txs),
          address: address,
          balance: balance
        },
      }
    : {
        redirect: {
          permanent: false,
          destination: "/",
        },
        props: {},
      };
};
