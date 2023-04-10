import React, { useEffect } from "react";
import {
  Box,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
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
import { performPOST } from "../../utils/helpers";
import { getListing } from "../../prisma/CRUD/listing/read";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

const CreateProposal = (props: any) => {
  const { accountId, listingId, listing, accountType } = props;
  const [duration, setDuation] = React.useState(0);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  let router = useRouter();
  var { data, status } = useSession();
  const titles = ["Title", "Price", "Description"];
  const keys = ["title", "price", "description"];
  const createNewProposal = async () => {
    if (!accountId) return;
    const proposal: Proposal = {
      id: listingId,
      freelancerId: accountId,
      duration: duration * 86400,
      status: "PENDING",
      title: title,
      description: description,
    };
    await performPOST(
      "http://localhost:3000/api/proposal",
      JSON.stringify(proposal),
      (response) => {
        console.log("response", response);
        router.push("/");
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
        <TitleText>Create A Proposal</TitleText>
        {/* Listing details */}
        <List>
          {titles.map((element, index) => (
            <ListItem
              key={index}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
              }}
            >
              <Typography variant="body2">{titles[index]}</Typography>
              <Typography variant="h6">
                {keys[index] !== "price"
                  ? listing && listing[keys[index]]
                  : listing && listing.price / 1e6 + "$"}
              </Typography>
            </ListItem>
          ))}
        </List>
        {/* Proposal details */}
        <TextField
          onChange={(event) => {
            setTitle(event.target.value as string);
          }}
          placeholder="Title"
        />
        <TextField
          onChange={(event) => {
            setDuation(Number(event.target.value));
          }}
          placeholder="Duration (Days)"
          type="number"
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
        <SubmitButton onClick={createNewProposal}>CREATE</SubmitButton>
      </FormWrapper>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async (c) => {
  const session = await unstable_getServerSession(c.req, c.res, authOptions);
  let id: string | null = null;
  let accountType: string | null = null;
  let listingId: string = c.query.listingId as string;
  let listing: Listing | null = null;
  if (session) {
    id = (session?.user as Account).id;
    listing = await getListing(listingId);
    accountType = (session?.user as Account).accountType;
  }
  if (accountType === "FREELANCER") {
    return {
      props: {
        accountId: id,
        listing: listing,
        listingId: listing?.id,
        accountType: accountType,
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
  // return {
  //   props: {
  //     accountId: id,
  //     listing:listing,
  //     listingId: listing?.id,
  //     accountType: accountType,
  //   },
  // };
};

export default CreateProposal;
