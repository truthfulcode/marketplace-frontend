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
  MainButton,
  styles,
  SubmitButton,
  TitleText,
} from "../../components/StyledComponents";
import FormWrapper from "../../components/FormWrapper";
import { useRouter } from "next/router";
import { Account, Submission } from "@prisma/client";
import { GetServerSideProps, GetStaticProps } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { getOrder, getSubmission } from "../../prisma/CRUD/order/read";
import Link from "next/link";
import { performPUT } from "../../utils/helpers";

const ViewOrder = (props: any) => {
  const { accountId, accountType, submission: _submission } = props;

  const [submission, setSubmission] = React.useState<Submission>();
  const router = useRouter()
  const CustomerDisplay = () => (
    <>
      <FormWrapper method="POST" onSubmit={() => {}}>
        {/* Contact Form */}
        <TitleText>Submission Details</TitleText>
        {submission?.files.length === 0 && submission?.description === "" ? (
          <Typography sx={{ ...styles.center }}>No Records</Typography>
        ) : (
          <>
            <List>
              <ListItem
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                }}
              >
                <Typography variant="body2">Description</Typography>
                <Typography variant="h6">{submission?.description}</Typography>
              </ListItem>
              <ListItem
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                }}
              >
                <Typography variant="body2">Files</Typography>
                {submission?.files.map((file, index) => (
                  <Link key={index} href={file} target="_blank">
                    <Typography variant="h6">
                      {file.length > 38 ? file.substring(0, 38) + "...." : file}
                    </Typography>
                  </Link>
                ))}
              </ListItem>
            </List>
          </>
        )}
        {/* {submission ? <></> : ""} */}
        <SubmitButton onClick={confirmOrder}>CONFIRM</SubmitButton>
        <SubmitButton onClick={cancelOrder}>CANCEL</SubmitButton>
      </FormWrapper>
    </>
  );
  const confirmOrder = async () => {
    await performPUT(
      "/api/order",
      JSON.stringify({ confirm: true, orderId: submission?.id }),
      (response) => {
        console.log("response", response);
        router.push("/order");
      },
      (err) => {
        console.log("error", err);
      }
    );
  };
  const cancelOrder = async () => {
    await performPUT(
      "/api/order",
      JSON.stringify({ cancel: true, orderId : submission?.id }),
      (response) => {
        console.log("response", response);
        router.push("/order");
      },
      (err) => {
        console.log("error", err);
      }
    );
  };
  const FreelancerDisplay = () => <></>;
  useEffect(() => {
    if (_submission) {
      setSubmission(JSON.parse(_submission));
    }
  }, [_submission]);
  console.log("order", submission);
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
      {accountType === "CUSTOMER" ? <CustomerDisplay /> : <FreelancerDisplay />}
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async (c) => {
  const session = await unstable_getServerSession(c.req, c.res, authOptions);
  let id: string | null = null;
  let accountType: string | null = null;
  let submissionId = c.query.submissionId as string;
  let submission: Submission | null = null;
  console.log("id", submissionId);
  if (session && submissionId) {
    submission = await getSubmission(submissionId);
    id = (session?.user as Account).id;
    accountType = (session?.user as Account).accountType;
  }
  if (submissionId) {
    return {
      props: {
        accountId: id,
        submission: JSON.stringify(submission),
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
};

export default ViewOrder;
