import { Box, List, ListItem, Typography } from "@mui/material";
import Button from "@mui/material/Button/Button";
import { Account, AccountType, Listing, Proposal } from "@prisma/client";
import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Interface from "../../components/Payment/Interface";
import {
  MainButton,
  styles,
  TitleText,
} from "../../components/StyledComponents";
import { getCustomerListings } from "../../prisma/CRUD/listing/read";
import {
  getProposalsByFreelancerId,
  getProposalsByListingId,
} from "../../prisma/CRUD/proposal/read";
import { performPUT } from "../../utils/helpers";
import { PaymentPage } from "../../utils/types";
import { authOptions } from "../api/auth/[...nextauth]";

// display list of listings
const Index = (props) => {
  const { accountType, proposals, listingId } = props;
  console.log("proposals",proposals)
  const router = useRouter();
  const acceptProposalAndCreateOrder = async (_proposalId, _listingId) => {
    await performPUT(
      "/api/proposal",
      JSON.stringify({ proposalId: _proposalId, listingId: _listingId }),
      (response) => {
        console.log("SUCCESS");
        router.push("/order");
      },
      (err) => {
        console.log("ERROR");
        console.log("response", err);
      }
    );
  };
  return (
    <Box>
      <Navbar />
      {accountType === "CUSTOMER" ? (
        <>
          <Box sx={{ width: "80vw", position: "relative", m: "auto", mt: 16 }}>
            <TitleText
              sx={{ position: "absolute", right: 0, left: 0, bottom: 0 }}
            >
              Listing Proposals
            </TitleText>
          </Box>
          <List sx={{ width: "80vw", m: "auto" }}>
            {Array.from(proposals).length === 0 ? (
              <Typography sx={{ ...styles.center }}>No Records</Typography>
            ) : (
              proposals.map((element, index) => (
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
                      <Typography variant="body2" sx={{mr:1}}>
                        {"duration: " + element.duration / 86400+" days "}
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
                      {element.status === "PENDING" && (
                        <MainButton
                          onClick={async () => {
                            await acceptProposalAndCreateOrder(
                              element.id,
                              listingId
                            );
                          }}
                        >
                          ACCEPT
                        </MainButton>
                      )}
                    </Box>
                  </Box>
                </ListItem>
              ))
            )}
          </List>
        </>
      ) : (
        <>
          <Box sx={{ width: "80vw", position: "relative", m: "auto", mt: 16 }}>
            <TitleText
              sx={{ position: "absolute", right: 0, left: 0, bottom: 0 }}
            >
              Listing Proposals
            </TitleText>
          </Box>
          <List sx={{ width: "80vw", m: "auto" }}>
            {Array.from(proposals).length === 0 ? (
              <Typography sx={{ ...styles.center }}>No Records</Typography>
            ) : (
              proposals.map((element, index) => (
                <ListItem
                  key={index}
                  sx={{
                    borderRadius: 4,
                    border: "black solid 3px",
                    flexDirection: "row",
                    minHeight: "120px",
                    maxHeight: "200px",
                    mb: 2,
                  }}
                >
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
                    sx={{ position: "absolute", right: 96, top: 8 }}
                  >
                    {"duration: " + element.duration / 86400}days
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ position: "absolute", right: 16, top: 12 }}
                  >
                    {element.status}
                  </Typography>
                  {/* </Link> */}
                  <Box sx={{ position: "absolute", right: 8, bottom: 0 }}>
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
                  </Box>
                </ListItem>
              ))
            )}
          </List>
        </>
      )}
    </Box>
  );
  // return <Interface isDeposit={accountType==="CUSTOMER"} page={PaymentPage.Activity} />;
};
export default Index;
export const getServerSideProps: GetServerSideProps = async (c) => {
  const session = await unstable_getServerSession(c.req, c.res, authOptions);
  let accountType: AccountType | null = null;
  let proposals: Proposal[] | null = null;
  let listingId: string = c.query.listingId as string;
  listingId = listingId ? listingId : "";
  if (session) {
    accountType = (session?.user as Account).accountType;
    if (listingId && accountType === "CUSTOMER") {
      proposals = await getProposalsByListingId(listingId);
    } else {
      proposals = await getProposalsByFreelancerId(
        (session?.user as Account).id
      );
    }
  }
  console.log("object", {
    accountType: accountType,
    proposals: proposals,
    listingId: listingId,
  });
  // for customer, it would be to inspect a listing proposals
  // for freelancer, it would be to navigate his own proposals
  return session
    ? {
        props: {
          accountType: accountType,
          proposals: proposals,
          listingId: listingId,
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
