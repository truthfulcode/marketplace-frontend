import React, { useEffect } from "react";
import { Box, TextareaAutosize, TextField, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import Navbar from "../components/Navbar";
import {
  styles,
  SubmitButton,
  TitleText,
} from "../components/StyledComponents";
import FormWrapper from "../components/FormWrapper";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Account, Listing } from "@prisma/client";
import { getCustomerIdByAccountId } from "../prisma/CRUD/user/read";
import { GetServerSideProps, GetStaticProps } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";

const createListing = (props:any) => {
    const {accountId, accountType} = props;

    const [category, setCategory] = React.useState('');
    const [price, setPrice] = React.useState(0);
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
    let id = (data?.user as Account).id;
    if(!accountId) return;
    const listing: Listing = {
      id: "",
      customerId: accountId,
      price: price,
      title: title,
      description: description,
      files: [],
    };
    console.log("listing",listing)
    try {
      const response = await fetch("./api/listing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(listing),
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
        onChange={(event)=>{setPrice(Number(event.target.value))}}
        placeholder="Price" type="number" />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={category}
            label="Category"
            onChange={(event)=>{setCategory(event.target.value as string)}}
          >
            <MenuItem value="Design">Graphics & Design</MenuItem>
            <MenuItem value="Music">Music & Audio</MenuItem>
            <MenuItem value="Programming">Programming & Tech</MenuItem>
            <MenuItem value="Marketing">Digital Marketing</MenuItem>
            <MenuItem value="Business">Business</MenuItem>
            <MenuItem value="Writing">Writing & Translation</MenuItem>
            <MenuItem value="Data">Data</MenuItem>
            <MenuItem value="Lifestyle">Lifestyle</MenuItem>
            <MenuItem value="Video">Video & Animation</MenuItem>
            <MenuItem value="Other">Others</MenuItem>
          </Select>
        </FormControl>
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

export default createListing;
