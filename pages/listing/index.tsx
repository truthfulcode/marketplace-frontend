import { Box, List, ListItem, Typography } from "@mui/material";
import Button from "@mui/material/Button/Button";
import { Account, AccountType, Listing } from "@prisma/client";
import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Interface from "../../components/Payment/Interface";
import { MainButton, styles, TitleText } from "../../components/StyledComponents";
import { getCustomerListings } from "../../prisma/CRUD/listing/read";
import { PaymentPage } from "../../utils/types";
import { authOptions } from "../api/auth/[...nextauth]";

// display list of listings

const index = (props) => {
  const { accountType, listings } = props;

  useEffect(() => {
    console.log("listings", listings);
  }, []);
  return (
    <Box>
      <Navbar />
      <Box sx={{width:"80vw",position:"relative",m:"auto",mt: 8}}>
        <Link href="/listing/create">
          <MainButton sx={{zIndex:1}}>CREATE LISTING</MainButton>
        </Link>
        <TitleText sx={{position:"absolute",right:0,left:0, bottom:0}}>My Listings</TitleText>
      </Box>
      <List sx={{ width: "80vw", m: "auto" }}>
        {Array.from(listings).length === 0
          ? "No Records"
          : listings.map((element, index) => (
              <ListItem
                key={index}
                sx={{
                  borderRadius: 4,
                  border: "black solid 3px",
                  flexDirection: "row",
                  minHeight: "120px",
                  maxHeight: "200px",
                  // display: "flex",
                  // alignItems: "flex-start",
                  mb: 2,
                }}
              >
                {/* <Link href={{pathname:"listing/view",query:{
              listingId:element.id
            }}}> */}
                <Typography
                  variant="h4"
                  sx={{ position: "absolute", left: 16, top: 8 }}
                >
                  {element.title}
                </Typography>
                <Typography
                  sx={{ position: "absolute", left: 16, bottom: 8 }}
                  variant="h6"
                >
                  {element.description}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{ position: "absolute", right: 84, top: 8 }}
                >
                  {element.price / 1e6}$
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ position: "absolute", right: 16, top: 12 }}
                >
                  {element.status}
                </Typography>
                {/* </Link> */}
                <Box sx={{ position: "absolute", right: 8, bottom: 0  }}>
                  <Link href={{pathname:"listing/view",query:{
                      listingId:element.id
                    }}}>
                    <MainButton>VIEW</MainButton>
                  </Link>
                  {element.status === "DRAFT" && 
                  <Link href={{pathname:"listing/update",query:{
                    listingId:element.id
                  }}}>
                    <MainButton>UPDATE</MainButton>
                  </Link>
                  }
                  {element.status === "ACTIVE" && 
                  <Link href={{pathname:"listing/update",query:{
                    listingId:element.id
                  }}}>
                    <MainButton>PROPOSALS</MainButton>
                  </Link>
                  }
                </Box>
              </ListItem>
            ))}
      </List>
    </Box>
  );
  // return <Interface isDeposit={accountType==="CUSTOMER"} page={PaymentPage.Activity} />;
};
export default index;
export const getServerSideProps: GetServerSideProps = async (c) => {
  const session = await unstable_getServerSession(c.req, c.res, authOptions);
  let accountType: AccountType | null = null;
  let listings: Listing[] | null = null;
  console.log("session server", session);

  if (session) {
    accountType = (session?.user as Account).accountType;
    listings = await getCustomerListings((session?.user as Account).id);
  }
  return session
    ? {
        props: {
          accountType: accountType,
          listings: listings,
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
