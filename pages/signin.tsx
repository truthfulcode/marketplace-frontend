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
  let defaultBody = {
    // grant_type: "",
    username: "asdf@gmail.com",
    password: "asdf",
    // scope: "",
    // client_id: "",
    // client_secret: "",
  };
  const onSubmit = async (values:Object) => {
    try{
      const body = { ...defaultBody, ...values };
      console.log(`POSTing ${JSON.stringify(body, null, 2)}`);
      let res = await signIN("credentials", {
        ...body,
        callbackUrl: router.query.callbackUrl?.at(0),
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
    let isError = false;
    let errorMessage;
    let value = event.target.value;
    if(typeof username === "string"){
      if(validEmail(username)){
        isError = validEmail(value)
        if(isError) errorMessage = "Invalid Email Format";
      }else{
        isError = value.length < 8
        if(isError) errorMessage = "length must be greater or equal to 8"
      }
      setUsername({value:value, error: errorMessage ? errorMessage : undefined});
    } else if(typeof password === "string"){
      setPassword({value:value, error: errorMessage ? errorMessage : undefined});
    }
  };

  // const signIn = () => {
  //   const [username, setUsername] = useState<ValueWithError>();
  //   const [password, setPassword] = useState<ValueWithError>();
  //   const handleUsernameChange = (
  //     event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  //   ) => {
  //     let isError = false;
  //     let errorMessage;
  //     let value = event.target.value;
  //     if(typeof username === "string"){
  //       if(validEmail(username)){
  //         isError = validEmail(value)
  //         if(isError) errorMessage = "Invalid Email Format";
  //       }else{
  //         isError = value.length < 8
  //         if(isError) errorMessage = "length must be greater or equal to 8"
  //       }
  //     }
  //     setUsername({value:value, error: errorMessage ? errorMessage : undefined});
  //   };
  // }
  const signOut = () =>{}
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
        <SubmitButton>SIGN IN</SubmitButton>
      </FormWrapper>
    </Box>
  );
};

export default signIn;
