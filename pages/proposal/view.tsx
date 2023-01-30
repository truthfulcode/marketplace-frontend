import React from "react";
import {
  Box,
  TextareaAutosize,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Typography,Paper, makeStyles,
} from "@mui/material";
import Navbar from "../../components/Navbar";
import {
  styles,
  SubmitButton,
  TitleText,
} from "../../components/StyledComponents";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Account, Listing, Proposal } from "@prisma/client";
import { GetServerSideProps, GetStaticProps } from "next";
import { Theme, unstable_getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { CenterFocusStrong } from "@mui/icons-material";


  
const view = () => {
    
  return (
    <>
      <Navbar />
      <Paper
      elevation={24}
      sx={{padding:"10px",marginX:"20px",marginTop:"90px",justifyContent:"center"
    }}>
      <Typography variant="h5" component="h3" align="center">
        Proposal Details
      </Typography>
      <Typography component="p"
      sx={{margin:'10px',...styles.center}}
      >
        <strong>Title:</strong> New Website Design
      </Typography>
      <Typography component="p"
      sx={{margin:'10px',...styles.center}}
      >
        <strong>Client:</strong> ABC Company
      </Typography>
      <Typography component="p"
      sx={{margin:'10px',...styles.center}}
      >
        <strong>Budget:</strong> $10,000
      </Typography>
      <Typography component="p"
      sx={{margin:'10px',...styles.center}}
      >
        <strong>Duration:</strong> 4 weeks
      </Typography>
      <Typography component="p"
      sx={{margin:'10px',...styles.center}}>
        <strong>Description:</strong> Our team will design a new website for ABC Company that is modern, responsive and user-friendly.
      </Typography>
    </Paper>
    </>
  );
};
export default view;
