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
    if(!newValue || newValue === "") _error = undefined;
    console.log("new",newValue,_error)
    setAddress((obj) =>
      Object.assign({}, obj, {
        value: newValue,
        error: _error,
      })
    );
  };
  const withdraw = async () => {
    if (Number(amount.value) < 10 || !isAddress(address.value as string)) return;
    try {
      const response = await fetch("http://localhost:3000/api/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          destination:address.value as string,
          amount:((amount.value as number) * 1e6).toString()
        }),
      });
      console.log("response",response)
      console.log("response",JSON.stringify({
        destination:address.value,
        amount:((amount.value as number) * 1e6)
      }))
      const isSuccess = response.ok && response.status == 200;
      if (isSuccess) {
        console.log("SUCCESS");
        router.push("/payment/activity");
      } else {
        const message = await response.json();
        console.log("ERROR");
        console.log("response", message);
      }
    } catch (err) {
      console.log("failed request",err)
    }
  };
  return (
    <Box sx={{ flexDirection: "column" }}>
      <Box sx={{ ...styles.center, mt: 4 }}>
        <Box>
          <Typography variant="h5">USDC Balance : ${balance / 1e6}</Typography>
            Supported Crypto
            <List sx={{ ...styles.center }}>
              <ListItem sx={{ ...styles.center, flexDirection: "column" }}>
                <Image
                  src={"/img/USDC.png"}
                  width={48}
                  height={48}
                  alt="USDC"
                />
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
              <Button onClick={withdraw} sx={{ ...styles.button, p: 2, mt: 2 }}>WITHDRAW</Button>
            </FormControl>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Withdraw;
