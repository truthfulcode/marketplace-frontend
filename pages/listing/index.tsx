import { Box, Grid, List, ListItem, Typography } from "@mui/material";
import Button from "@mui/material/Button/Button";
import { Account, AccountType, Listing, Proposal } from "@prisma/client";
import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Interface from "../../components/Payment/Interface";
import {
  MainButton,
  styles,
  TitleText,
} from "../../components/StyledComponents";
import {
  getCustomerListings,
  getListingsAppliedByFreelancer,
  getListingsBySerachQuery,
} from "../../prisma/CRUD/listing/read";
import { PaymentPage } from "../../utils/types";
import { authOptions } from "../api/auth/[...nextauth]";

// display list of listings
const CustomerDisplay = ({ listings }) => (
  <>
    <Box sx={{ width: "80vw", position: "relative", m: "auto", mt: 8 }}>
      <Link href="/listing/create">
        <MainButton sx={{ zIndex: 1 }}>CREATE LISTING</MainButton>
      </Link>
      <TitleText sx={{ position: "absolute", right: 0, left: 0, bottom: 0 }}>
        My Listings
      </TitleText>
    </Box>
    <List sx={{ width: "80vw", m: "auto" }}>
      {Array.from(listings).length === 0 ? (
        <Typography sx={{ ...styles.center }}>No Records</Typography>
      ) : (
        listings.map((element, index) => (
          <ListItem
            key={index}
            sx={{
              borderRadius: 4,
              border: "black solid 3px",
              flexDirection: "row",
              height: "100%",
              mb: 2,
            }}
          >
            <Box
              sx={{
                // position: "absolute",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                height: "100%",
                flex: 1,
              }}
            >
              <Typography variant="h4">{element.title}</Typography>
              <Typography variant="h6">{element.description}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                flex: 0,
                height: "100%",
                alignItems: "flex-end",
                alignContent: "flex-end",
              }}
            >
              <Box
                sx={{
                  right: 16,
                  top: 8,
                  display: "flex",
                  flexDirection: "row",
                  height: "100%",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <Typography marginRight={1} variant="h5">
                  {element.price / 1e6}$
                </Typography>
                <Typography variant="body1">{element.status}</Typography>
              </Box>
              {/* </Link> */}
              <Box
                sx={{
                  // position: "absolute",
                  right: 8,
                  bottom: 0,
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <Link
                  href={{
                    pathname: "listing/view",
                    query: {
                      listingId: element.id,
                    },
                  }}
                >
                  <MainButton>VIEW</MainButton>
                </Link>
                {element.status === "DRAFT" && (
                  <Link
                    href={{
                      pathname: "listing/update",
                      query: {
                        listingId: element.id,
                      },
                    }}
                  >
                    <MainButton>UPDATE</MainButton>
                  </Link>
                )}
                {element.status === "ACTIVE" && (
                  <Link
                    href={{
                      pathname: "proposal/",
                      query: {
                        listingId: element.id,
                      },
                    }}
                  >
                    <MainButton>PROPOSALS</MainButton>
                  </Link>
                )}
              </Box>
            </Box>
          </ListItem>
        ))
      )}
    </List>
  </>
);

const FreelancerDisplay = ({ listings, isAppliedListings }) => (
  <>
    <Box sx={{ width: "80vw", position: "relative", m: "auto", mt: 16 }}>
      <TitleText sx={{ position: "absolute", right: 0, left: 0, bottom: 0 }}>
        Listings Search
      </TitleText>
    </Box>
    <List sx={{ width: "80vw", m: "auto" }}>
      {Array.from(listings).length === 0 ? (
        <Typography sx={{ ...styles.center }}>No Records</Typography>
      ) : (
        listings.map((element, index) => (
          <ListItem
            key={index}
            sx={{
              borderRadius: 4,
              border: "black solid 3px",
              flexDirection: "row",
              height: "100%",
              mb: 2,
            }}
          >
            <Box
              sx={{
                // position: "absolute",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                height: "100%",
                flex: 1,
              }}
            >
              <Typography variant="h4">{element.title}</Typography>
              <Typography variant="h6">{element.description}</Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                flex: 0,
                height: "100%",
                alignItems: "flex-end",
                alignContent: "flex-end",
              }}
            >
              <Box
                sx={{
                  right: 16,
                  top: 8,
                  display: "flex",
                  flexDirection: "row",
                  height: "100%",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <Typography marginRight={1} variant="h5">
                  {element.price / 1e6}$
                </Typography>
                <Typography variant="body1">{element.status}</Typography>
              </Box>
              <Box
                sx={{
                  // position: "absolute",
                  right: 8,
                  bottom: 0,
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <Link
                  href={{
                    pathname: "listing/view",
                    query: {
                      listingId: element.id,
                    },
                  }}
                >
                  <MainButton>VIEW</MainButton>
                </Link>
                {isAppliedListings[index] ? (
                  <MainButton disableTouchRipple sx={{ cursor: "unset" }}>
                    SUBMITTED
                  </MainButton>
                ) : (
                  <Link
                    href={{
                      pathname: "proposal/create",
                      query: {
                        listingId: element.id,
                      },
                    }}
                  >
                    <MainButton>SUBMIT PROPOSAL</MainButton>
                  </Link>
                )}
              </Box>
            </Box>
          </ListItem>
        ))
      )}
    </List>
  </>
);

const Index = (props) => {
  const { accountType, listings, isAppliedListings } = props;
  return (
    <Box>
      <Navbar />
      {accountType === "CUSTOMER" ? (
        <CustomerDisplay listings={listings} />
      ) : (
        <FreelancerDisplay
          isAppliedListings={isAppliedListings}
          listings={listings}
        />
      )}
    </Box>
  );
  // return <Interface isDeposit={accountType==="CUSTOMER"} page={PaymentPage.Activity} />;
};
export default Index;
export const getServerSideProps: GetServerSideProps = async (c) => {
  const session = await unstable_getServerSession(c.req, c.res, authOptions);
  let accountType: AccountType | null = null;
  let listings: Listing[] | null = null;
  let appliedListingsIds: string[] = [];
  let isAppliedListings: boolean[] = [];
  let search = c.query.search as string;
  console.log("search query", c.query);
  console.log("session server", session);
  if (session) {
    accountType = (session?.user as Account).accountType;
    if (search === "" || search === " ") {
      listings = [];
    } else if (accountType === "CUSTOMER") {
      listings = await getCustomerListings((session?.user as Account).id);
    } else {
      listings = await getListingsBySerachQuery(search);
      let _appliedListings = await getListingsAppliedByFreelancer(
        (session?.user as Account).id
      );
      appliedListingsIds = _appliedListings
        ? _appliedListings.map((listing) => listing.id)
        : [];
      console.log("listings", listings?.length);
      console.log("applied listing", appliedListingsIds.length);
      if (listings) {
        listings.map((value) => {
          isAppliedListings.push(
            appliedListingsIds.includes(value.id) ? true : false
          );
        });
      }
    }
  }
  return session
    ? {
        props: {
          accountType: accountType,
          listings: listings,
          isAppliedListings: isAppliedListings,
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
