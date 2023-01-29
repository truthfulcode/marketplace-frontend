import { Account, Transaction } from "@prisma/client";
import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import { useRouter } from "next/router";
import Interface from "../../components/Payment/Interface";
import { getTransactionsOfEthereumAccountUsingId } from "../../prisma/CRUD/transaction/read";
import { getAddressByCustomerId } from "../../prisma/CRUD/user/read";
import { PaymentPage } from "../../utils/types";
import { authOptions } from "../api/auth/[...nextauth]";

const Dest = (props) => {
  const {accountId,accountType,txs,address} = props;
  const router = useRouter();
  let query = router.query.id
  if(accountType !=="FREELANCER" && accountType !== "CUSTOMER"){
    console.log("non user",accountType)
    router.push('/404');
  }else if (query == "" || query == "/" || query == "activity" || query == "Activity") {
    return <Interface page={PaymentPage.Activity} txs={txs} />;
  } else if (query == "deposit" || query == "Deposit") {
    return <Interface page={PaymentPage.Deposit} address={address} />;
  } else if (query == "withdraw" || query == "Withdraw") {
    return <Interface page={PaymentPage.Withdraw} />;
  } else {
    // return not found
    router.push('/404')
  }
};

export const getServerSideProps: GetServerSideProps = async (c) => {
  const session = await unstable_getServerSession(c.req,c.res,authOptions);
  const id = (session?.user as Account).id;
  const accountType = (session?.user as Account).accountType;
  let txs : Transaction[] = []
  let address : string | null = null;
  if(accountType === "CUSTOMER"){
    txs = await getTransactionsOfEthereumAccountUsingId(id);
    address = await getAddressByCustomerId(id);
  }
  return {props:{
    accountId:id,
    accountType:accountType,
    txs:JSON.stringify(txs),
    address:address
  }}
}

export default Dest;
