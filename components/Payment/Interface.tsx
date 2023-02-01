import React, { useState } from "react";
import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  styled,
} from "@mui/material";
import {
  MainButton,
  styles,
  SubmitButton,
  TitleText,
} from "../../components/StyledComponents";
import Navbar from "../../components/Navbar";
import { PaymentPage, transaction } from "../../utils/types";
import Activity from "../../components/Payment/Activity";
import Deposit from "../../components/Payment/Deposit";
import Withdraw from "../../components/Payment/Withdraw";
import Link from "next/link";

const Interface = ({
  isDeposit = false,
  page = PaymentPage.Activity,
  txs = undefined,
  address = undefined,
  balance = 0,
}) => {
  // const [page, setPage] = useState<PaymentPage>(PaymentPage.Activity)
  const SideBarButton = styled(MainButton)({
    fontSize: 12,
    padding: 4,
    minWidth: 80,
    border: "none",
    backgroundColor: "#E9E9E9",
  });
  const paymentButtonTitles = ["activity", "deposit", "withdraw"];
  const paymentButtonDests = [
    "/payment/activity",
    "/payment/deposit",
    "/payment/withdraw",
  ];
  const MainDisplay = () => {
    switch (page) {
      case PaymentPage.Deposit: {
        return <Deposit address={address} balance={balance} />;
      }
      case PaymentPage.Withdraw: {
        return <Withdraw balance={balance} />;
      }
      default: {
        return <Activity txs={txs} />;
      }
    }
  };
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar />

      <TitleText sx={{ mt: 8 }}>Payment</TitleText>
      <Box
        sx={{
          width: "100vw",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          mt: 4,
        }}
      >
        <Box flex={3} sx={{ padding: 2 }}>
          <MainDisplay />
        </Box>

        <List sx={{ ...styles.background, flex: 1, mt: 2, p: 0 }}>
          {(isDeposit
            ? ["activity", "deposit", "withdraw"]
            : ["activity", "withdraw"]
          ).map((value, index) => (
            <div key={index}>
              <Link href={"/payment/" + value}>
                <ListItemButton
                  sx={{ ...styles.sideBarText, ...styles.button }}
                >
                  <ListItemText sx={{ ...styles.center }}>{value}</ListItemText>
                </ListItemButton>
              </Link>
              <Divider />
            </div>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default Interface;
