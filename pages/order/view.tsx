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
import { Account, Listing, ListingCategory, Order } from "@prisma/client";
import { GetServerSideProps, GetStaticProps } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import ExtendableLinkFields from "../../components/ExtendableLinkFields";
import { getListing } from "../../prisma/CRUD/listing/read";
import Link from "next/link";
import { getOrder } from "../../prisma/CRUD/order/read";

const viewOrder = (props: any) => {
  const titles = ["Status", "Price", "Created At", "Ends At"];
  const keys = ["status", "price", "createdAt", "endsAt"];
  const { accountId, order:_order} = props;

  const [order, setOrder] = React.useState<Listing>();

  useEffect(() => {
    if (_order) {
      setOrder(JSON.parse(_order));
    }
  }, []);
  console.log("order",order)
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
                  ? order && order[keys[index]]
                  : order && order.price / 1e6 + "$"}
              </Typography>
            </ListItem>
          ))}
        </List>
      </FormWrapper>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async (c) => {
  const session = await unstable_getServerSession(c.req, c.res, authOptions);
  let id: string | null = null;
  let accountType: string | null = null;
  let orderId = c.query.orderId as string;
  let order: Order | null = null;
  if (session && orderId) {
    order = await getOrder(orderId);
    id = (session?.user as Account).id;
    accountType = (session?.user as Account).accountType;
  }
  if (orderId) {
    return {
      props: {
        accountId: id,
        order: JSON.stringify(order),
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

export default viewOrder;
