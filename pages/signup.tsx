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
import {
  defaultAccount,
  encrypt,
  isString,
  onlyString,
  performPOST,
  sha512,
  validEmail,
} from "../utils/helpers";
import { login_keys } from "../utils/constants";
import {
  AccountRegsiterState,
  FormInput,
  ValueWithError,
} from "../utils/types";
import { useRouter } from "next/router";
import { calculateSizeAdjustValues } from "next/dist/server/font-utils";

const SignUp = () => {
  const [account, setAccount] = useState<AccountRegsiterState>(defaultAccount);
  const router = useRouter();
  const getValueById = (id: string) => {
    if (document.getElementById(id) as HTMLInputElement)
      return (document.getElementById(id) as HTMLInputElement).value;
    else {
      if ((document.getElementById("U_T_F") as HTMLInputElement).value) {
        return "FREELANCER";
      } else if ((document.getElementById("U_T_C") as HTMLInputElement).value) {
        return "CUSTOMER";
      }
    }
    if (document.getElementById(id) as HTMLInputElement)
      return (document.getElementById(id) as HTMLInputElement).value;
    else {
      if ((document.getElementById("U_T_F") as HTMLInputElement).value) {
        return "FREELANCER";
      } else if ((document.getElementById("U_T_C") as HTMLInputElement).value) {
        return "FREELANCER";
      }
    }
  };
  const verifyInputs = () => {
    let isFound = false;
    login_keys.map((key) => {
      var value = getValueById(key); // setValue
      checkValidity(key, value ? value : "");
      let error = account[key]?.error;
      if (!value || value.length === 0) {
        // throw an error
        setAccountValue(key, value, "empty input");
        isFound = true;
      } else if (error) {
        isFound = true;
      }
    });
    const _account: Account = {
      id: "",
      username: account.U?.value as string,
      firstName: account.F_N?.value as string,
      lastName: account.L_N?.value as string,
      email: account.E?.value as string,
      password: sha512(account.P?.value as string),
      phoneNumber: account.P_N?.value as string,
      accountType: account.U_T?.value as AccountType,

      userId: "",
      expires_at: 0,
      access_token: "",
      session_state: "",
      id_token: "",
      scope: "",
      refresh_token: "",
      token_type: "",
      provider: "",
      providerAccountId: "",
      type: "",
    };
    return [isFound, _account];
  };
  const createUser = async () => {
    let [isFound, _account] = verifyInputs();
    if (isFound) return;
    await performPOST(
      "/api/user",
      JSON.stringify(_account),
      (response) => {
        console.log("response", response);
        router.push("/signin");
      },
      (error) => {
        console.log("err response", error);
      }
    );
  };

  const checkValidity = (key: FormInput, value: string) => {
    let isError = false;
    let errorMessage;
    switch (key) {
      case "U": {
        isError = value.length < 8;
        if (isError) errorMessage = "length must be greater or equal to 8";
        break;
      }
      case "E": {
        isError = !validEmail(value);
        if (isError) errorMessage = "Invalid Email Format";
        break;
      }
      case "F_N": {
        isError = !onlyString(value);
        if (isError) errorMessage = "input should only be characters";
        isError = !onlyString(value);
        if (isError) errorMessage = "input should only be characters";
        break;
      }
      case "L_N": {
        isError = !onlyString(value);
        if (isError) errorMessage = "input should only be characters";
        isError = !onlyString(value);
        if (isError) errorMessage = "input should only be characters";
        break;
      }
      case "P": {
        isError = value.length < 18;
        if (isError) errorMessage = "length must be greater or equal to 18";
        break;
      }
      case "P_N": {
        isError = value.length !== 11;
        if (isError) errorMessage = "length not equal to 11";
        break;
      }
      case "U_T": {
        isError = !["CUSTOMER", "FREELANCER"].includes(value);
        if (isError) errorMessage = "only Freelancer or Customer User Type";
        break;
      }
    }
    setAccountValue(key, value, isError ? errorMessage : undefined);
  };
  const setAccountValue = (
    key: FormInput,
    value: String | undefined,
    error?: String
  ) => {
    setAccount((account) =>
      Object.assign({}, account, { [key]: { value: value, error: error } })
    );
  };
  useEffect(() => {
    setAccountValue("U_T", "CUSTOMER");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const setAccountValueOnly = (key: FormInput, value: String | undefined) => {
    let _account: AccountRegsiterState = account;
    setAccount((account) =>
      Object.assign({}, account, {
        [key]: { value: value, error: _account[key]?.error },
      })
    );
  };
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
      <Navbar />
      <FormWrapper method="POST" onSubmit={() => {}}>
        <TitleText>SIGN UP</TitleText>
        <TextField
          id="U"
          onChange={(e) => {
            setAccountValueOnly("U", e.target.value);
          }}
          error={account.U?.error !== undefined}
          helperText={account.U?.error}
          variant="outlined"
          placeholder="Username"
        />
        <TextField
          id="F_N"
          onChange={(e) => {
            setAccountValueOnly("F_N", e.target.value);
          }}
          error={account.F_N?.error !== undefined}
          helperText={account.F_N?.error}
          variant="outlined"
          placeholder="First Name"
        />
        <TextField
          id="L_N"
          onChange={(e) => {
            setAccountValueOnly("L_N", e.target.value);
          }}
          error={account.L_N?.error !== undefined}
          variant="outlined"
          placeholder="Last Name"
          helperText={account.L_N?.error}
        />
        <TextField
          id="P"
          type={"password"}
          onChange={(e) => {
            setAccountValueOnly("P", e.target.value);
          }}
          error={account.P?.error !== undefined}
          helperText={account.P?.error}
          variant="outlined"
          placeholder="Password"
        />
        <TextField
          id="E"
          onChange={(e) => {
            setAccountValueOnly("E", e.target.value);
          }}
          type={"email"}
          error={account.E?.error !== undefined}
          variant="outlined"
          placeholder="Email"
          helperText={account.E?.error}
        />
        <TextField
          id="P_N"
          onChange={(e) => {
            setAccountValueOnly("P_N", e.target.value);
          }}
          error={account.P_N?.error !== undefined}
          variant="outlined"
          placeholder="Phone Nmber"
          helperText={account.P_N?.error}
        />
        <FormControl
          sx={{ p: "14px" }}
          error={account.U_T?.error !== undefined}
        >
          <FormLabel id="demo-row-radio-buttons-group-label">
            User Type
          </FormLabel>
          <RadioGroup
            onChange={(e) => {
              setAccountValueOnly("U_T", e.target.value);
            }}
            row
            defaultValue="CUSTOMER"
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            aria-required
          >
            <FormControlLabel
              value="CUSTOMER"
              control={<Radio id="U_T_C" />}
              label="Customer"
            />
            <FormControlLabel
              value="FREELANCER"
              control={<Radio id="U_T_F" />}
              label="Freelancer"
            />
          </RadioGroup>
        </FormControl>
        <SubmitButton onClick={createUser}>REGISTER</SubmitButton>
      </FormWrapper>
    </Box>
  );
};

export default SignUp;
