import React, { useEffect } from "react";
import {
  Box,
  TextareaAutosize,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  ListItem,
  List,
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
import { getListing } from "../../prisma/CRUD/listing/read";
import Link from "next/link";
import { keys, titles } from "../../utils/constants";

const createListing = (props: any) => {
  const { accountId, listing: _listing } = props;
  const [listing, setListing] = React.useState<Listing>();


  useEffect(() => {
    if (_listing) {
      setListing(JSON.parse(_listing));
    }
  }, []);
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
        <TitleText>Listing Details</TitleText>
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
          <ListItem
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            <Typography variant="body2">Files</Typography>
            {listing?.files.length === 0
              ? "No Files!"
              : listing?.files.map((ele) => (
                  <Link href={ele} target="_blank">
                    <Typography variant="h6">{ele}</Typography>
                  </Link>
                ))}
          </ListItem>
        </List>
      </FormWrapper>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async (c) => {
  const session = await unstable_getServerSession(c.req, c.res, authOptions);
  let id: string | null = null;
  let accountType: string | null = null;
  let listingId = c.query.listingId;
  let listing: Listing | null = null;
  if (session && listingId) {
    id = (session?.user as Account).id;
    accountType = (session?.user as Account).accountType;
    listing = await getListing(listingId as string);
  }
  if (listingId) {
    return {
      props: {
        accountId: id,
        listing: JSON.stringify(listing),
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

export default createListing;
