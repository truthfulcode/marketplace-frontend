import React, { useEffect, useState } from "react";
import { Typography, Box, Grid, TextField, styled } from "@mui/material";
import Navbar from "../components/Navbar";
import {
  styles,
  SubmitButton,
  TitleText,
} from "../components/StyledComponents";
import FormWrapper from "../components/FormWrapper";
import { ValueWithError } from "../utils/types";
import { isString, validEmail } from "../utils/helpers";
import {
  useSession,
  signIn as signIN,
  signOut as signOUT,
} from "next-auth/react";
import Router, { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { Account, AccountType } from "@prisma/client";

const SignIn = () => {
  const [username, setUsername] = useState<ValueWithError>();
  const [password, setPassword] = useState<ValueWithError>();
  let router = useRouter();
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();
  const { data: session, status } = useSession();
  const onSubmit = async (values: Object) => {
    let _u = username?.value;
    let _p = password?.value;
    let defaultBody = {
      username: _u ? _u : "asdf@gmail.com",
      password: _p ? _p : "asdf",

    };
    try {
      const body = { ...defaultBody };

      let res = await signIN("credentials", {
        ...body,
      });
      console.log(`signing:onsubmit:res`, res);
    } catch (err) {
      console.error(err);
    }
  };
  const handleChange = (
    isUser: boolean,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let isError = false;
    let errorMessage;
    let value = event.target.value;
    if (isUser) {
      // email
      if (!validEmail(value)) {
        isError = value.length < 8;
        if (isError) errorMessage = "length must be greater or equal to 8";
      }
      setUsername({
        value: value,
        error: errorMessage ? errorMessage : undefined,
      });
    } else {
      setPassword({
        value: value,
        error: errorMessage ? errorMessage : undefined,
      });
    }
  };
  return (
    <Box
      sx={{
        ...styles.header,
        ...styles.shadow,
        height: "100vh",
      }}
    >
      <Navbar />
      <FormWrapper method="POST" onSubmit={handleSubmit(onSubmit)}>
        <TitleText>SIGN IN</TitleText>
        <TextField
          error={isString(username)}
          onChange={(e) => handleChange(true, e)}
          helperText={username?.error}
          variant="outlined"
          placeholder="Email | Username"
        />
        <TextField
          error={isString(password)}
          onChange={(e) => handleChange(false, e)}
          helperText={password?.error}
          variant="outlined"
          type="password"
          placeholder="Password"
        />
        {session ? (
          <SubmitButton
            onClick={async () => {
              await signOUT({
                callbackUrl: router.query.callbackUrl as string,
              });
            }}
          >
            SIGN OUT
          </SubmitButton>
        ) : (
          <SubmitButton onClick={handleSubmit(onSubmit)}>SIGN IN</SubmitButton>
        )}
      </FormWrapper>
    </Box>
  );
};

export default SignIn;

export const getServerSideProps: GetServerSideProps = async (c) => {
  const session = await unstable_getServerSession(c.req, c.res, authOptions);
  let accountType: AccountType | null = null;
  if (session) {
    accountType = (session?.user as Account).accountType;
  }
  return !session
    ? {
        props: {
          accountType: accountType,
        },
      }
    : {
        redirect: {
          permanent: false,
          destination: "/",
        },
        props: {},
      };
};
