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
import { Account, Submission } from "@prisma/client";
import { GetServerSideProps, GetStaticProps } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { getOrder, getSubmission } from "../../prisma/CRUD/order/read";
import Link from "next/link";

const viewOrder = (props: any) => {
  const { accountId, submission: _submission } = props;

  const [submission, setSubmission] = React.useState<Submission>();

  useEffect(() => {
    if (_submission) {
      setSubmission(JSON.parse(_submission));
    }
  }, []);
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
      <FormWrapper method="POST" onSubmit={() => {}}>
        {/* Contact Form */}
        <TitleText>Listing Details</TitleText>
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
            {submission?.files.map((file) => (
              <Link href={file} target="_blank">
                <Typography variant="h6">{file}</Typography>
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
