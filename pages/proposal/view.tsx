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
                    borderRadius:'15px 50px 30px',
                    boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                    padding:'12px',
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
                borderRadius:'15px 50px 30px',
                marginTop:"10px",
                padding:'12px',
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
                    borderRadius:'15px 50px 30px',
                    padding:'12px',
                }}
            ><strong>Status :</strong>Active </Typography>
            <Typography
                variant="h5"
                sx={{  marginInline:"150px",
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                color: "white",
                borderRadius:'15px 50px 30px',
                marginTop:"10px",
                padding:'12px',
            }}
            ><strong>Author :</strong>Mohand Alaa </Typography>
            <Typography
                variant="h5"
                sx={{  marginInline:"150px",
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                color: "white",
                borderRadius:' 50px ',    
                marginTop:"10px",
                padding:'20px',
            }}
            ><strong>Description :</strong> Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem rem deserunt, aspernatur rerum nostrum suscipit. Cumque id voluptatum, sunt temporibus quaerat quis molestiae repudiandae nihil odio necessitatibus dicta fuga reprehenderit.</Typography>




        </div>
    );

};
export default view;
