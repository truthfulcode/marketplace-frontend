import React, { useEffect } from "react";
import {
  Box,
  TextareaAutosize,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Navbar from "../../components/Navbar";
import {
  styles,
  SubmitButton,
  TitleText,
} from "../../components/StyledComponents";
import FormWrapper from "../../components/FormWrapper";
import { useRouter } from "next/router";
import { Account, Listing, ListingCategory } from "@prisma/client";
import { GetServerSideProps, GetStaticProps } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import ExtendableLinkFields from "../../components/ExtendableLinkFields";
import { performPOST } from "../../utils/helpers";

const CreateListing = (props: any) => {
  const { accountId } = props;
  const [category, setCategory] = React.useState("");
  const [price, setPrice] = React.useState(0);
  const [links, setLinks] = React.useState<Array<string>>([""]);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  let router = useRouter();
  const pushLink = (newLink: string) => {
    setLinks((oldLinks) => [...oldLinks, newLink]);
  };
  const rmoveLink = (index: number) => {
    if (links.length > 1) {
      setLinks((_links) => _links.filter((link, i) => i !== index));
    }
  };

  const onLinkChange = (index: number, newValue: string) => {
    let array = [...links];
    array[index] = newValue;
    setLinks(array);
  };
  const createNewListing = async (isActive: boolean) => {
    if (!accountId) return;
    let _files = links[0] === "" && links.length === 1 ? [] : links;
    const listing: Listing = {
      id: "",
      status: isActive ? "ACTIVE" : "DRAFT",
      category: category as ListingCategory,
      customerId: accountId,
      price: price * 1e6,
      title: title,
      description: description,
      files: _files,
    };
    await performPOST(
      "http://localhost:3000/api/listing",
      JSON.stringify(listing),
      (response) => {
        console.log("response", response);
        router.push("/listing");
      },
      (error) => {
        console.log("err response", error);
      }
    );
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
          onChange={(event) => {
            setTitle(event.target.value as string);
          }}
          label="Title"
          placeholder="Title"
        />
        <br></br>
        <TextField
          onChange={(event) => {
            setPrice(Number(event.target.value));
          }}
          placeholder="Price"
          label="Price"
          type="number"
        />
        <br></br>

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={category}
            label="Category"
            onChange={(event) => {
              setCategory(event.target.value as string);
            }}
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
        <ExtendableLinkFields
          onLinkChange={onLinkChange}
          links={links}
          pushLink={pushLink}
          removeLink={rmoveLink}
        />
        <br></br>
        <TextareaAutosize
          onChange={(event) => {
            setDescription(event.target.value as string);
          }}
          style={styles.formMessage}
          placeholder="Description"
        />
        <br></br>
        <SubmitButton
          onClick={async () => {
            await createNewListing(true);
          }}
        >
          CREATE
        </SubmitButton>
        <SubmitButton
          onClick={async () => {
            await createNewListing(false);
          }}
        >
          SAVE
        </SubmitButton>
      </FormWrapper>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async (c) => {
  const session = await unstable_getServerSession(c.req, c.res, authOptions);
  let id: string | null = null;
  let accountType: string | null = null;
  if (session) {
    id = (session?.user as Account).id;
    accountType = (session?.user as Account).accountType;
  }
  if (accountType === "CUSTOMER") {
    return {
      props: {
        accountId: id,
      },
    };
  } else {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    };
  }
};

export default CreateListing;
