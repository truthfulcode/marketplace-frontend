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
import { useSession, signIn as signIN , signOut as signOUT } from "next-auth/react";
import Router, { useRouter } from "next/router";
import { useForm } from "react-hook-form";

const signIn = () => {
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
  const onSubmit = async (values:Object) => {
    let _u = username?.value 
    let _p = password?.value
    let defaultBody = {
      // grant_type: "",
      username: _u ? _u : "asdf@gmail.com",
      password: _p ? _p : "asdf",
      // scope: "",
      // client_id: "",
      // client_secret: "",
    };
    try{
      const body = { ...defaultBody };
      console.log(`POSTing ${JSON.stringify(body, null, 2)}`);
      console.log("object submitted",{
        ...body,
        callbackUrl: router.query.callbackUrl,
      })
      let res = await signIN("credentials", {
        ...body,
        callbackUrl: router.query.callbackUrl as string,
      });
      console.log(`signing:onsubmit:res`, res);
    }catch(err){
      console.error(err);
    }
    if (status === "authenticated") {
      router.push("/", {
        query: {
          callbackUrl: router.query.callbackUrl,
        },
      });
  }}

  const handleChange = (
    isUser:boolean,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    console.log("session",session)
    let isError = false;
    let errorMessage;
    let value = event.target.value;
    if(isUser){
      // email
      if(validEmail(value)){
        // isError = !validEmail(value)
        // if(isError) errorMessage = "Invalid Email Format";
      }else{
        isError = value.length < 8
        if(isError) errorMessage = "length must be greater or equal to 8"
      }
      setUsername({value:value, error: errorMessage ? errorMessage : undefined});
    } else{
      setPassword({value:value, error: errorMessage ? errorMessage : undefined});
    }
  };
  // if (status === "authenticated") {
  //   router.push("/", {
  //     query: {
  //       callbackUrl: router.query.callbackUrl,
  //     },
  //   });
  // }
  return (
    <Box
      sx={{
        ...styles.header,
        ...styles.shadow,
        height: "100vh",
      }}
    >
      <Navbar signIn={false} />
      <FormWrapper method="POST" onSubmit={handleSubmit(onSubmit)}>
        {session +  " " +status}
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
        <SubmitButton onClick={handleSubmit(onSubmit)}>SIGN IN</SubmitButton>
        <SubmitButton onClick={async()=>{
          await signOUT({
            callbackUrl: router.query.callbackUrl as string,
          });
        }}>SIGN OUT</SubmitButton>
      </FormWrapper>
    </Box>
  );
};

export default signIn;
