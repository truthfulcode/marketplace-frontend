import React, { useState } from "react";
import { Typography, Box, Grid, TextField, styled, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import Navbar from "../components/Navbar";
import {
  styles,
  SubmitButton,
  TitleText,
} from "../components/StyledComponents";
import FormWrapper from "../components/FormWrapper";
import { Account, AccountType } from "@prisma/client";
import { isString, sha512 } from "../utils/helpers";
import { login_keys } from "../utils/constants";
import { FormInput, ValueWithError } from "../utils/types";
import { useRouter } from "next/router";

const signup = () => {
  const [account, setAccount] = useState(new Map<FormInput, ValueWithError>());
  const router = useRouter();
  const createUser = async () => {
    let isFound = false;
    login_keys.map((key) => {
      let val = account.get(key)?.value;
      if (!val || val === null || val.length === 0) {
        // throw an error
        isFound = true;
      }
    });

    if (isFound) return;
    const _account: Account = {
      id: "",
      username: account.get("U")?.value as string,
      firstName: account.get("F_N")?.value as string,
      lastName: account.get("L_N")?.value as string,
      email: account.get("E")?.value as string,
      password: sha512(account.get("P")?.value as string),
      phoneNumber: account.get("P_N")?.value as string,
      accountType: account.get("U_T")?.value as AccountType,
    };
    try {
      const response = await fetch("./api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(_account),
      });
      const isSuccess = response.ok && response.status == 200;
      if (isSuccess) {
        console.log("SUCCESS");
        router.push("/signin");
      } else {
        const message = await response.json();
        console.log("response", message);
      }
    } catch (err) {}
  };
  
  const setAccVal = (
    key: FormInput,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let _account: Map<FormInput, ValueWithError> = account;
    _account.set(key, {value : event.target.value, error: _account.get(key)?.error});
    setAccount(_account);
  };
  const isValid = (key:FormInput) => typeof account.get(key)?.error === 'string'
  return (
    <Box
      sx={{
        ...styles.header,
        ...styles.shadow,
        backgroundImage: "url(/img/white-bg.png)",
        height: "100vh",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <Navbar signUp={false} />
      <FormWrapper method="POST">
        <TitleText>SIGN UP</TitleText>
        <TextField
          error={isValid("U")}
          onChange={(e) => setAccVal("U", e)}
          variant="outlined"
          placeholder="Username"
          helperText={account.get("U")?.error}
        />
        <TextField
          error={isValid("F_N")}
          onChange={(e) => setAccVal("F_N", e)}
          variant="outlined"
          placeholder="First Name"
          helperText={account.get("F_N")?.error}
        />
        <TextField
          error={isValid("L_N")}
          onChange={(e) => setAccVal("L_N", e)}
          variant="outlined"
          placeholder="Last Name"
          helperText={account.get("L_N")?.error}
        />
        <TextField
          error={isValid("P")}
          onChange={(e) => setAccVal("P", e)}
          variant="outlined"
          placeholder="Password"
          helperText={account.get("P")?.error}
        />
        <TextField
          error={isValid("E")}
          onChange={(e) => setAccVal("E", e)}
          variant="outlined"
          placeholder="Email"
          helperText={account.get("E")?.error}
        />
        <TextField
          error={isValid("P_N")}
          onChange={(e) => setAccVal("P_N", e)}
          variant="outlined"
          placeholder="Phone Nmber"
          helperText={account.get("P_N")?.error}
        />
        <FormControl sx={{p:"14px"}} error={isValid("U_T")}>
          <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
          <RadioGroup
            row
            defaultValue="CUSTOMER"
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            onChange={(e) => setAccVal("U_T", e)}
            aria-required
          >
            <FormControlLabel value="CUSTOMER" control={<Radio />} label="Customer" />
            <FormControlLabel value="FREELANCER" control={<Radio />} label="Freelancer" />
          </RadioGroup>
        </FormControl>
        <SubmitButton onClick={createUser}>REGISTER</SubmitButton>
      </FormWrapper>
    </Box>
  );
};

export default signup;
