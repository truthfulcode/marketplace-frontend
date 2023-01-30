import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import { PaymentType } from "../../utils/types";
import { styles } from "../StyledComponents";
import Form from "./Form";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CryptoDeposit from "./CryptoDeposit";

const Setting = () => {  
  return (
    <Box sx={{ flexDirection: "column" }}>
      <Box
        sx={{ width: "100%", ...styles.center, justifyContent: "space-around" }}
      >
        <Button
          sx={{...styles.background, color: "black", width: "50%" }}
          disableRipple
          startIcon={<AccountBalanceIcon />}
        >
          BANK
        </Button>
      </Box>
      <Box sx={{ ...styles.center, mt: 4 }}>
        <Form action="UPDATE" />
      </Box>
    </Box>
  );
};

export default Setting;
