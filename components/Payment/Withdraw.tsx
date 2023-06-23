import {
  Box,
  Button,
  ButtonGroup,
  ListItemText,
  FormControl,
  Icon,
  IconButton,
  Input,
  List,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { styles } from "../StyledComponents";
import Image from "next/image";
import { ValueNumberWithError, ValueWithError } from "../../utils/types";
import { isAddress } from "ethers/lib/utils";
import { useRouter } from "next/router";
import { performPUT } from "../../utils/helpers";
const Withdraw = ({ balance = 0 }) => {
  const router = useRouter();
  const [address, setAddress] = useState<ValueWithError>({
    error: undefined,
    value: "",
  });
  const [amount, setAmount] = useState<ValueNumberWithError>({
    error: undefined,
    value: 0,
  });
  const handleAmountChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let _error: string | undefined = undefined;
    let newValue = Number(event.target.value);
    if (newValue > balance/1e6) _error = "insufficient balance to be withdrawn!";
    if (newValue < 10) _error = "must be greater or equal to 10$";
    if (newValue === 0) _error = undefined;
    setAmount((obj) =>
      Object.assign({}, obj, {
        value: newValue,
        error: _error,
      })
    );
  };
  const handleAddressChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let _error: string | undefined = undefined;
    let newValue = event.target.value;
    if (!isAddress(newValue)) _error = "invalid ethereum address!";
    if (!newValue || newValue === "") _error = undefined;
    setAddress((obj) =>
      Object.assign({}, obj, {
        value: newValue,
        error: _error,
      })
    );
  };
  const withdraw = async () => {
    if (Number(amount.value) < 10 || !isAddress(address.value as string))
      return;
    await performPUT(
      "/api/user",
      JSON.stringify({
        destination: address.value as string,
        amount: ((amount.value as number) * 1e6).toString(),
      }),
      (response) => {
        console.log("SUCCESS");
        router.push("/payment/activity");
      },
      (err) => {
        console.log("ERROR");
        console.log("response", err);
      }
    );
  };
  return (
    <Box sx={{ flexDirection: "column" }}>
      <Box sx={{ ...styles.center, mt: 4 }}>
        <Box>
          <Typography variant="h5">USDC Balance : ${balance / 1e6}</Typography>
          Supported Crypto
          <List sx={{ ...styles.center }}>
            <ListItem sx={{ ...styles.center, flexDirection: "column" }}>
              <Image src={"/img/USDC.png"} width={48} height={48} alt="USDC" />
              <ListItemText>USDC</ListItemText>
            </ListItem>
          </List>
          <Typography>
            Make sure to provide the right address, since transactions cannot be
            reverted!
          </Typography>
          <br />
          <Box sx={{ ...styles.center }}>
            <FormControl sx={{ width: "100%" }}>
              <TextField
                error={address.error !== undefined}
                helperText={address.error}
                onChange={(e) => {
                  handleAddressChange(e);
                }}
                label="ADDRESS"
              />
              <TextField
                type="number"
                InputProps={{ inputProps: { min: 10 } }}
                error={amount.error !== undefined}
                helperText={amount.error}
                onChange={(e) => {
                  handleAmountChange(e);
                }}
                label="AMOUNT"
              />
              <Button onClick={withdraw} sx={{ ...styles.button, p: 2, mt: 2 }}>
                WITHDRAW
              </Button>
            </FormControl>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Withdraw;
