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
import Footer from "../../components/Footer";
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


const list = () => {

    return(
        <div>
            <Navbar />











        </div>

    )

}
export default list