import { Box, List, ListItem, Typography } from "@mui/material";
import Button from "@mui/material/Button/Button";
import { Account, AccountType, Listing, Order, Proposal } from "@prisma/client";
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
import {
  getOrdersByCustomerId,
  getOrdersByFreelancerId,
} from "../../prisma/CRUD/order/read";
import { PaymentPage } from "../../utils/types";
import { authOptions } from "../api/auth/[...nextauth]";

// display list of listings
const CustomerDisplay = ({ orders }) => (
  <>
    <Box sx={{ width: "80vw", position: "relative", m: "auto", mt: 16 }}>
      <TitleText sx={{ position: "absolute", right: 0, left: 0, bottom: 0 }}>
        My Orders
      </TitleText>
    </Box>
    <List sx={{ width: "80vw", m: "auto" }}>
      {Array.from(orders).length === 0 ? (
        <Typography sx={{ ...styles.center }}>No Records</Typography>
      ) : (
        orders.map((element, index) => (
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
              <Typography variant="h4">
                Created At: {element.createdAt}
              </Typography>
              <Typography variant="h6">Ends At: {element.endsAt}</Typography>
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
                <Typography marginRight={1} variant="h5">{element.price / 1e6}$</Typography>
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
                    pathname: "order/view",
                    query: {
                      orderId: element.id,
                    },
                  }}
                >
                  <MainButton>VIEW</MainButton>
                </Link>

                {element.status !== "CANCELLED" && (
                  <Link
                    href={{
                      pathname: "submission/view",
                      query: {
                        submissionId: element.id,
                      },
                    }}
                  >
                    <MainButton>SUBMISSION</MainButton>
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

const FreelancerDisplay = ({ orders }) => (
  <>
    {console.log("orders", orders)}

    <Box sx={{ width: "80vw", position: "relative", m: "auto", mt: 16 }}>
      <TitleText sx={{ position: "absolute", right: 0, left: 0, bottom: 0 }}>
        Orders List
      </TitleText>
    </Box>
    <List sx={{ width: "80vw", m: "auto" }}>
      {Array.from(orders).length === 0 ? (
        <Typography sx={{ ...styles.center }}>No Records</Typography>
      ) : (
        orders.map((element, index) => (
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
              <Typography variant="h4">
                Created At: {element.createdAt}
              </Typography>
              <Typography variant="h6">Ends At: {element.endsAt}</Typography>
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
                <Typography marginRight={1} variant="h5">{element.price / 1e6}$</Typography>
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
                    pathname: "order/view",
                    query: {
                      orderId: element.id,
                    },
                  }}
                >
                  <MainButton>VIEW</MainButton>
                </Link>
                {element.status === "ACTIVE" ? (
                  <Link
                    href={{
                      pathname: "submission/create",
                      query: {
                        orderId: element.id,
                      },
                    }}
                  >
                    <MainButton>SUBMIT</MainButton>
                  </Link>
                ) : (
                  ""
                )}
              </Box>
            </Box>

            {/* </Link> */}
            <Box sx={{ position: "absolute", right: 8, bottom: 0 }}>
              {/* {isAppliedListings[index] ? 
              <MainButton disableTouchRipple sx={{cursor:"unset"}}>SUBMITTED</MainButton>
              :
              <Link
                href={{
                  pathname: "proposal/create",
                  query: {
                    listingId: element.id,
                  },
                }}
              >
                <MainButton>SUBMIT</MainButton>
              </Link>
              } */}
            </Box>
          </ListItem>
        ))
      )}
    </List>
  </>
);

const Index = (props) => {
  const { accountType, orders } = props;
  return (
    <Box>
      <Navbar />
      {accountType === "CUSTOMER" ? (
        <CustomerDisplay orders={orders} />
      ) : (
        <FreelancerDisplay orders={orders} />
      )}
    </Box>
  );
  // return <Interface isDeposit={accountType==="CUSTOMER"} page={PaymentPage.Activity} />;
};
export default Index;
export const getServerSideProps: GetServerSideProps = async (c) => {
  const session = await unstable_getServerSession(c.req, c.res, authOptions);
  let accountType: AccountType | null = null;
  let _orders: Order[] | null = [];

  if (session) {
    accountType = (session?.user as Account).accountType;
    console.log("user id", (session?.user as Account).id);
    if (accountType === "CUSTOMER") {
      _orders = await getOrdersByCustomerId((session?.user as Account).id);
    } else {
      _orders = await getOrdersByFreelancerId((session?.user as Account).id);
    }
  }
  let orders = _orders.map((order) => ({
    id: order.id,
    createdAt: order.createdAt.toString().substring(0, 25),
    endsAt: order.endsAt.toString().substring(0, 25),
    price: order.price,
    status: order.status,
    freelancerId: order.freelancerId,
    customerId: order.customerId,
  }));
  console.log("orders", orders);

  return session
    ? {
        props: {
          accountType: accountType,
          orders: orders,
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
