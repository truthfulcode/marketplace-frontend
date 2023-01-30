import React from "react";
import {
    Box,
    Typography, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Grid
} from "@mui/material";
import Navbar from "../../components/Navbar";
import ListCard from '../../components/ListCard'
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
import { CenterFocusStrong, Margin } from "@mui/icons-material";

const list = () => {
    return (
        <div>
            <Navbar />
            <Typography variant="h2"
                sx={{
                    ...styles.center, position: "relative",
                    minHeight: "440px",
                    padding: "16px",
                    fontWeight: 'bold',
                    background: 'linear-gradient(to right, #0052D4, #65C7F7, #9CECFB)',
                    color: 'white',
                    animation: 'gradient 15s ease infinite'
                }}
            >List of Proposals</Typography>
            <Box sx={{ display: "flex",margin:"12px"}} >
                <Grid sx={{ padding: "10px 0px" }}
                    container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={8} md={3}>
                        <ListCard
                            service='UI/UX'
                            description='we offer the best freelancers for interfce design and development'
                        />
                    </Grid>
                    <Grid item xs={8} md={3} >
                        <ListCard
                            service='UI/UX'
                            description='we offer the best freelancers for interfce design and development'
                        />
                    </Grid>
                    <Grid item xs={8} md={3}>
                        <ListCard
                            service='UI/UX'
                            description='we offer the best freelancers for interfce design and development'
                        />
                    </Grid>
                    <Grid item xs={8} md={3}>
                        <ListCard
                            service='UI/UX'
                            description='we offer the best freelancers for interfce design and development'
                        />
                    </Grid>
                    <Grid item xs={8} md={3}>
                        <ListCard
                            service='UI/UX'
                            description='we offer the best freelancers for interfce design and development'
                        />
                    </Grid>


                </Grid>

            </Box>
        </div>
    )
}
export default list