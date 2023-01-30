import { Account, AccountType } from "@prisma/client";
import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import React from "react";
import Interface from "../../components/Payment/Interface";
import { PaymentPage } from "../../utils/types";
import { authOptions } from "../api/auth/[...nextauth]";

const index = (props) => {
  const {accountType} = props
  return <Interface isDeposit={accountType==="CUSTOMER"} page={PaymentPage.Activity} />;
};
export default index;

export const getServerSideProps: GetServerSideProps = async (c) => {
  const session = await unstable_getServerSession(c.req, c.res, authOptions);
  let accountType: AccountType | null = null;
  console.log("session server", session);
  if (session) {
    accountType = (session?.user as Account).accountType;
  }
  return session
    ? {
        props: {
          accountType: accountType,
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
