import React, { useState } from "react";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import {
  MainButton,
  styles,
  SubmitButton,
  TitleText,
} from "../../components/StyledComponents";
import CustomForm from "../../components/CustomForm";
import Navbar from "../../components/Navbar";
import { PaymentPage, transaction } from "../../utils/types";
import Activity from "../../components/Payment/Activity";
import Deposit from "../../components/Payment/Deposit";
import Withdraw from "../../components/Payment/Withdraw";
import Setting from "../../components/Payment/Setting";
import Link from "next/link";

const Interface = ({page = PaymentPage.Activity}) => {
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
        return <Deposit/>
      }
      case PaymentPage.Withdraw:{
        return <Withdraw/>
      }
      case PaymentPage.Setting:{
        return <Setting/>
      }
      default : {
        return <Activity/>
      }
    }
  }
  return (
    <Box
      sx={{
        height: "71vh",
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
          {["activity", "deposit", "withdraw", "setting"].map((value,index) => (
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
