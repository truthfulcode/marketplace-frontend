import { Account, Transaction } from "@prisma/client";
import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Interface from "../../components/Payment/Interface";
import { getTransactionsOfEthereumAccountUsingId } from "../../prisma/CRUD/transaction/read";
import { getAddressByCustomerId, getBalance } from "../../prisma/CRUD/user/read";
import { PaymentPage } from "../../utils/types";
import { authOptions } from "../api/auth/[...nextauth]";

const Dest = (props) => {
  const { accountId, accountType, txs, address, balance } = props;
  useEffect(() => {
    console.log("accType", accountType);
    console.log("deposit address", address);
  });
  const router = useRouter();
  let query = router.query.id;
  console.log("query", query, accountType);
  if (accountType === "CUSTOMER") {
    if (query === "" || query === "/" || query === "activity") {
      return <Interface isDeposit={true} page={PaymentPage.Activity} txs={txs} />;
    } else if (query === "deposit") {
      return <Interface isDeposit={true} page={PaymentPage.Deposit} address={address} balance={balance}/>;
    } else if (query === "withdraw") {
      return <Interface isDeposit={true} page={PaymentPage.Withdraw} balance={balance}/>;
    } else {
      // router.push("/404");
    }
  } else if (accountType === "FREELANCER") {
    if (query === "" || query === "/" || query === "activity") {
      return <Interface page={PaymentPage.Activity} txs={txs} />;
    } else if (query === "withdraw") {
      return <Interface page={PaymentPage.Withdraw} balance={balance}/>;
    } else {
      // router.push("/404");
    }
  } else if (typeof window === "undefined") {
    return null;
  } else {
    // return not found
    // router.push("/404");
  }
};

export const getServerSideProps: GetServerSideProps = async (c) => {
  const session = await unstable_getServerSession(c.req, c.res, authOptions);
  let id: string | null = null;
  let accountType: string | null = null;
  let txs: Transaction[] | null = null;
  let address: string | null = null;
  let balance: number | null = 0;
  console.log("session", session, accountType);
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

export default Dest;
