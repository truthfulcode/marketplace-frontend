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
    Typography, Paper, makeStyles,
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
        <div>
            <Navbar />
            <Typography variant="h2"
                sx={{
                    ...styles.center,
                    position: "relative",
                    minHeight: "450px",
                    padding: "16px",
                    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                    boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                    color: "white"
                }}
            ><strong>Proposal Details</strong></Typography>
            <Typography
                variant="h5"
                sx={{
                    
                    marginInline:"150px",
                    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                    borderRadius:'8px',
                    boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                    padding:'8px',
                    color: "white",
                    marginTop:"10px",

                }}
            ><strong>Title :</strong> New Website Design</Typography>
            <Typography
                variant="h5"
                sx={{ marginInline:"150px",
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                color: "white",
                borderRadius:'8px',
                marginTop:"10px",
                padding:'8px',
            }}
            ><strong>Duration :</strong> 4 weeks</Typography>
            <Typography
                variant="h5"
                sx={{
                    marginInline:"150px",
                    marginTop:"10px",
                    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                    boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                    color: "white",
                    borderRadius:'8px',
                    padding:'8px',
                }}
            ><strong>Status :</strong>Active </Typography>
            <Typography
                variant="h5"
                sx={{  marginInline:"150px",
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                color: "white",
                borderRadius:'8px',
                marginTop:"10px",
                padding:'8px',
            }}
            ><strong>Author :</strong>Mohand Alaa </Typography>
            <Typography
                variant="h5"
                sx={{  marginInline:"150px",
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                color: "white",
                borderRadius:'8px',    
                marginTop:"10px",
                padding:'8px',
            }}
            ><strong>Description :</strong> Our team will design a new website for ABC Company that is modern, responsive and user-friendly.</Typography>




            {/*
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
       */}
        </div>
    );

};
export default view;
