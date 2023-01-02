import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Grid,
  TextField,
  styled,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  keyframes,
} from "@mui/material";
import Navbar from "../components/Navbar";
import {
  styles,
  SubmitButton,
  TitleText,
} from "../components/StyledComponents";
import FormWrapper from "../components/FormWrapper";
import { Account, AccountType } from "@prisma/client";
import { isString, onlyString, sha512, validEmail } from "../utils/helpers";
import { login_keys } from "../utils/constants";
import { AccountRegsiterState, FormInput, ValueWithError } from "../utils/types";
import { useRouter } from "next/router";
import { calculateSizeAdjustValues } from "next/dist/server/font-utils";

const signup = () => {
  const [account, setAccount] = useState<AccountRegsiterState>({E:undefined,F_N:undefined,L_N:undefined,P:undefined,P_N:undefined,U:undefined,U_T:{value:"CUSTOMER", error:undefined}});
  const router = useRouter();
  useEffect(()=>{
    console.log("effect")
  })

  const getValueById = (id:string) =>{
    return (document.getElementById(id) as HTMLInputElement).value;
  }

  const createUser = async () => {
    let isFound = false;
    console.log("MAP",account)


    login_keys.map((key) => {
      var value = getValueById(key); // setValue
      handleChange(key,value)

      let error = account[key]?.error
      if (!value || value.length === 0) {
        // throw an error
        console.log(value);
        setAccountValue(key, value, "empty input");
        isFound = true;
      } else if(error){
        isFound = true;
      }
    });
    if (isFound) return;
    const _account: Account = {
      id: "",
      username: account.U?.value as string,
      firstName: account.F_N?.value as string,
      lastName: account.L_N?.value as string,
      email: account.E?.value as string,
      password: sha512(account.P?.value as string),
      phoneNumber: account.P_N?.value as string,
      accountType: account.U_T?.value as AccountType,
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
  
  const handleChange = (
    key: FormInput,
    value: string
  ) => {
    let isError = false;
    let errorMessage;
    switch (key) {
      case "U": {
        isError = value.length < 8;
        if(isError) errorMessage = "length must be greater or equal to 8";
        break;
      }
      case "E": {
        isError = validEmail(value)
        if(isError) errorMessage = "Invalid Email Format";
        break;
      }
      case "F_N": {
        isError = onlyString(value)
        if(isError) errorMessage = "input should only be string"
        break;
      }
      case "L_N": {
        isError = onlyString(value)
        if(isError) errorMessage = "input should only be string"
        break;
      }
      case "P": {
        isError = value.length < 18;
        if(isError) errorMessage = "length must be greater or equal to 18";
        break;
      }
      case "P_N": {
        isError = value.length !== 11;
        if(isError) errorMessage = "length not equal to 11"
        break;
      }
      case "U_T": {
        isError = !["CUSTOMER","FREELANCER"].includes(value);
        if(isError) errorMessage = "only Freelancer or Customer User Type"
        break;
      }
    }
    setAccountValue(key,value, isError ? errorMessage : undefined);
  };
  const setAccountValue = (key:FormInput, value:String | undefined, error?:String) => {
    let _account: AccountRegsiterState = account;
    _account[key] = { value: value, error: error ? _account[key]?.error : undefined };
    setAccount((account) => Object.assign({},account,{[key]:{value:value,error:error}}));
  }
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
        value {account.U?.error}
      <FormWrapper method="POST">
        <TitleText>SIGN UP</TitleText>
        <TextField
          id="U"
          error={account.U?.error !== undefined}
          helperText={account.U?.error}
          variant="outlined"
          placeholder="Username"
        />
        <TextField
          id="F_N"
          error={account.F_N?.error !== undefined}
          helperText={account.F_N?.error}
          variant="outlined"
          placeholder="First Name"
        />
        <TextField
          id="L_N"
          error={account.L_N?.error !== undefined}
          variant="outlined"
          placeholder="Last Name"
          helperText={account.L_N?.error}
        />
        <TextField
          id="P"
          type={"password"}
          error={account.P?.error !== undefined}
          helperText={account.P?.error}
          variant="outlined"
          placeholder="Password"
        />
        <TextField
          id="E"
          type={"email"}
          error={account.E?.error !== undefined}
          variant="outlined"
          placeholder="Email"
          helperText={account.E?.error}
        />
        <TextField
          id="P_N"
          error={account.P_N?.error !== undefined}
          variant="outlined"
          placeholder="Phone Nmber"
          helperText={account.P_N?.error}
        />
        <FormControl sx={{ p: "14px" }} error={account.U_T?.error !== undefined}>
          <FormLabel id="demo-row-radio-buttons-group-label">User Type</FormLabel>
          <RadioGroup
            row
            defaultValue="CUSTOMER"
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            id="U_T"
            aria-required
          >
            <FormControlLabel
              value="CUSTOMER"
              control={<Radio />}
              label="Customer"
            />
            <FormControlLabel
              value="FREELANCER"
              control={<Radio />}
              label="Freelancer"
            />
          </RadioGroup>
        </FormControl>
        <SubmitButton onClick={createUser}>REGISTER</SubmitButton>
      </FormWrapper>
    </Box>
  );
};

export default signup;
