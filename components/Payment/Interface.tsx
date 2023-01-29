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

const Interface = ({page = PaymentPage.Activity, txs=undefined, address=undefined}) => {
  // const [page, setPage] = useState<PaymentPage>(PaymentPage.Activity)
  const SideBarButton = styled(MainButton)({
    fontSize: 12,
    padding: 4,
    minWidth: 80,
    border: "none",
    backgroundColor: "#E9E9E9",
  });
  const MainDisplay = () => {
    switch(page){
      case PaymentPage.Deposit:{
        return <Deposit address={address}/>
      }
      case PaymentPage.Withdraw:{
        return <Withdraw/>
      }
      default : {
        return <Activity txs={txs}/>
      }
    }
  }
  return (
    <Box
      sx={{
        height: "100vh",
        display:"flex",
        flexDirection:"column"
      }}
    >
      <Navbar />

      <TitleText sx={{ mt: 8 }}>Payment</TitleText>
      <Box
        sx={{ width: "100vw",height:"100%", display: "flex", flexDirection: "row", mt: 4 }}
      >
        <Box flex={3} sx={{padding:2}}>
          <MainDisplay/>
        </Box>

        <List sx={{  ...styles.background, flex: 1, mt:2,p:0 }}>
          {["activity", "deposit", "withdraw"].map((value,index) => (
            <>
            <Link href={"/payment/"+value}>
            <ListItemButton sx={{ ...styles.sideBarText, ...styles.button }}>
              <ListItemText sx={{ ...styles.center }}>
                {value}
              </ListItemText>
            </ListItemButton>
              </Link>
            <Divider/>
            </>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default Interface;
