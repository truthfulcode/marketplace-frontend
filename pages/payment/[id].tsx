import { useRouter } from "next/router";
import Interface from "../../components/Payment/Interface";
import { PaymentPage } from "../../utils/types";

const Dest = () => {
  const router = useRouter();
  let query = router.query.id
  if (query == "" || query == "/" || query == "activity" || query == "Activity") {
    return <Interface page={PaymentPage.Activity} />;
  } else if (query == "deposit" || query == "Deposit") {
    return <Interface page={PaymentPage.Deposit} />;
  } else if (query == "withdraw" || query == "Withdraw") {
    return <Interface page={PaymentPage.Withdraw} />;
  } else if (query == "setting" || query == "Setting") {
    return <Interface page={PaymentPage.Setting} />;
  } else {
    // return not found
  }
};

export default Dest;
