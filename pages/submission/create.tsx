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
import { Account, Listing, ListingCategory, Submission } from "@prisma/client";
import { GetServerSideProps, GetStaticProps } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import ExtendableLinkFields from "../../components/ExtendableLinkFields";
import { performPOST, performPUT } from "../../utils/helpers";

const CreateSubmission = (props: any) => {
  const { accountId, orderId } = props;
  const [links, setLinks] = React.useState<Array<string>>([""]);
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
  const createNewSubmission = async () => {
    if (!accountId) return;
    let _files = links[0] === "" && links.length === 1 ? [] : links;
    const submission: Submission = {
      id: orderId,
      description: description,
      files: _files,
    };
    await performPUT(
      "/api/order",
      JSON.stringify({submit:submission}),
      (response) => {
        console.log("response", response);
        router.push("/order");
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
        <TitleText>Submit Deliverables:</TitleText>
        <TextareaAutosize
          onChange={(event) => {
            setDescription(event.target.value as string);
          }}
          style={styles.formMessage}
          placeholder="Description"
        />
        <br></br>
        <ExtendableLinkFields
          onLinkChange={onLinkChange}
          links={links}
          pushLink={pushLink}
          removeLink={rmoveLink}
        />
        <br></br>
        <SubmitButton
          onClick={async () => {
            await createNewSubmission();
          }}
        >
          CREATE
        </SubmitButton>
      </FormWrapper>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async (c) => {
  const session = await unstable_getServerSession(c.req, c.res, authOptions);
  let id: string | null = null;
  let accountType: string | null = null;
  let orderId: string = c.query.orderId as string;
  if (session) {
    id = (session?.user as Account).id;
    accountType = (session?.user as Account).accountType;
  }
  if (accountType === "FREELANCER") {
    return {
      props: {
        id: id,
        orderId: orderId,
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

export default CreateSubmission;
