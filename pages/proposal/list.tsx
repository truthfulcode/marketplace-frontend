import React from "react";
import {
    Box,
    Typography, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody
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



const list = () => {

    return (
        <div>
            <Navbar/>
            <Typography variant="h2"
                sx={{ ...styles.center, ...styles.header }}
            >List of Proposals</Typography>
            <Box sx={{ flexDirection: "column", ...styles.center }}>
                <TableContainer sx={{ maxWidth: 1280 }} component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Proposal Id</TableCell>
                                <TableCell align="center">title</TableCell>
                                <TableCell align="center">duration</TableCell>
                                <TableCell align="center">status</TableCell>
                                <TableCell align="center">Author</TableCell>
                                <TableCell align="center">description</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow
                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">

                                </TableCell>
                                <TableCell align="center">Mond</TableCell>
                                <TableCell align="center">daas</TableCell>
                                <TableCell align="center">asas</TableCell>
                                <TableCell align="center">Mond</TableCell>
                                <TableCell align="center">daas</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </div>
    )



}
export default list