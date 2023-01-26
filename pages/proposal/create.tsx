import React, { useEffect } from "react";
import { Box, TextareaAutosize, TextField, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import Navbar from "../../components/Navbar";
import {
  styles,
  SubmitButton,
  TitleText,
} from "../../components/StyledComponents";
import FormWrapper from "../../components/FormWrapper";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Account, Listing, Proposal } from "@prisma/client";
import { GetServerSideProps, GetStaticProps } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";

const createProposal = (props:any) => {
    const {accountId, accountType} = props;
    const [duration, setDuation] = React.useState(0);
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    let router = useRouter();
    var {data, status} = useSession();

  useEffect(()=>{
    if(status !== 'authenticated' && accountType !== "CUSTOMER"){
      // transfer to 404
      router.push('/');
    }
  },[status])
  const createNewListing = async () => {
    if(!accountId) return;
    const proposal: Proposal = {
      id: "",
      freelancerId:"",
      duration:duration,
      status:"PENDING",
      title: title,
      description: description,
    };
    console.log("listing",proposal)
    try {
      const response = await fetch("./api/proposal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(proposal),
      });
      console.log("client-side",response)
      const isSuccess = response.ok && response.status == 200;
      if (isSuccess) {
        console.log("SUCCESS");
        router.push("/");
      } else {
        const message = await response.json();
        console.log("ERROR");
        console.log("create listing response", message);
      }
    } catch (err) {

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
      {/* Main Wrapper */}
      <Navbar />
      <FormWrapper method="POST" onSubmit={() => {}}>
        {/* Contact Form */}
        <TitleText>Create A Listing</TitleText>
        <TextField 
        onChange={(event)=>{setTitle(event.target.value as string)}}
        placeholder="Title" />
        <TextField 
        onChange={(event)=>{setDuation(Number(event.target.value))}}
        placeholder="Duration (Days)" type="number" />
        <br></br>
        <label style={{ fontWeight: "bold" }}>Images:</label>
        <br></br>
        <input type="file" id="files" name="files" multiple></input>
        <br></br>
        <TextareaAutosize
          onChange={(event)=>{setDescription(event.target.value as string)}}
          style={styles.formMessage}
          placeholder="Description"
        />
        <br></br>
        <SubmitButton onClick={createNewListing}>CREATE</SubmitButton>
      </FormWrapper>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async (c) => {
  const session = await unstable_getServerSession(c.req,c.res,authOptions);
  const id = (session?.user as Account).id;
  const accountType = (session?.user as Account).accountType;
  return {props:{
    accountId:id,
    accountType:accountType
  }}
}

export default createProposal;
