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
import { Account, Listing, ListingCategory } from "@prisma/client";
import { GetServerSideProps, GetStaticProps } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import ExtendableLinkFields from "../../components/ExtendableLinkFields";
import { getListing } from "../../prisma/CRUD/listing/read";
import { performPUT } from "../../utils/helpers";

const updateListing = (props: any) => {
  const { accountId, listing } = props;
  const [category, setCategory] = React.useState<string>("");
  const [listingId, setListingId] = React.useState<string>("");
  const [price, setPrice] = React.useState<number>(0);
  const [links, setLinks] = React.useState<Array<string>>((listing as Listing).files);
  const [title, setTitle] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  useEffect(() => {
    if (listing) {
      setListingId(listing.id)
      setPrice(listing.price / 1e6)
      setLinks(listing.files.length > 0 ? listing.files : [""])
      setTitle(listing.title)
      setCategory(listing.category)
      setDescription(listing.description)
    }
  }, []);
  
  let router = useRouter();
  const pushLink = (newLink: string) => {
    setLinks((oldLinks) => [...oldLinks, newLink]);
  };
  const rmoveLink = (index: number) => {
    setLinks((oldLinks) => oldLinks.filter((link, i) => i !== index));
  };
  const createNewListing = async (isActive:boolean) => {
    if (!accountId) return;
    let _files = links[0] === "" && links.length === 1 ? [] : links
    const listing: Listing = {
      id: listingId,
      status: isActive ? "ACTIVE" : "DRAFT",
      category: category as ListingCategory,
      customerId: accountId,
      price: price * 1e6,
      title: title,
      description: description,
      files: _files,
    };
    await performPUT("/api/listing",
    JSON.stringify({listing:listing as Listing}),
    (response) => {
      console.log("SUCCESS");
      router.push("/listing");
    },
    (err) => {
      console.log("ERROR");
      console.log("response", err);
    }
    )
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
        <TitleText>Update A Listing</TitleText>
        <TextField
          value={title}
          onChange={(event) => {
            setTitle(event.target.value as string);
          }}
          placeholder="Title"
        />
        <TextField
          value={price}
          onChange={(event) => {
            setPrice(Number(event.target.value));
          }}
          placeholder="Price"
          type="number"
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={category}
            label="Category"
            onChange={(event) => {
              setCategory(event.target.value as string);
            }}
          >
            <MenuItem value="Design">Graphics & Design</MenuItem>
            <MenuItem value="Music">Music & Audio</MenuItem>
            <MenuItem value="Programming">Programming & Tech</MenuItem>
            <MenuItem value="Marketing">Digital Marketing</MenuItem>
            <MenuItem value="Business">Business</MenuItem>
            <MenuItem value="Writing">Writing & Translation</MenuItem>
            <MenuItem value="Data">Data</MenuItem>
            <MenuItem value="Lifestyle">Lifestyle</MenuItem>
            <MenuItem value="Video">Video & Animation</MenuItem>
            <MenuItem value="Other">Others</MenuItem>
          </Select>
        </FormControl>
        <br></br>
        <ExtendableLinkFields
          onLinkChange={links}
          links={links}
          pushLink={pushLink}
          removeLink={rmoveLink}
        />
        <br></br>
        <TextareaAutosize
          value={description}
          onChange={(event) => {
            setDescription(event.target.value as string);
          }}
          style={styles.formMessage}
          placeholder="Description"
        />
        <br></br>
        <SubmitButton
          onClick={async () => {
            await createNewListing(true);
          }}
        >
          PUBLISH
        </SubmitButton>
        <SubmitButton
          onClick={async () => {
            await createNewListing(false);
          }}
        >
          SAVE
        </SubmitButton>
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
        listing: listing,
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

export default updateListing;
