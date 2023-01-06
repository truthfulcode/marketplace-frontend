import React, { useState } from "react";
import { Box,Typography , Grid, TextField, styled} from '@mui/material'
import Navbar from '../components/Navbar'
import Listcard from '../components/Listcard'
import Button from '@mui/material/Button'

// const grid2 = () =>{
//     <Grid item xs={8} md={3}>
//     <Listcard  service='UI/UX'
//         description='we offer the best freelancers for interfce design and development'
//         />
//     </Grid>
// }
const freelancerList = () => {
    return(
        <>
        <Navbar />
        <Box sx={{padding:"10px"}}>
        <Button sx={{padding:"10px 65px" ,
        left:"84%"}} variant="contained" disableElevation>Add New List</Button>

        <Box sx={{padding:"20px 10px",border:"1px solid black",margin:"30px 0px"}}>
        <Typography variant="h3" gutterBottom>
                On proggres projects
        </Typography>
            <Grid container spacing={3}>
                <Grid item xs={8} md={3}>
                    <Listcard  service='UI/UX'
                description='we offer the best freelancers for interfce design and development'
                />
                </Grid>
                <Grid item xs={8} md={3}>
                    <Listcard  service='UI/UX'
                        description='we offer the best freelancers for interfce design and development'
                />
                </Grid>
                <Grid item xs={8} md={3}>
                    <Listcard  service='UI/UX'
                description='we offer the best freelancers for interfce design and development'
                />
                </Grid>
                <Grid item xs={8} md={3}>
                    <Listcard  service='UI/UX'
                description='we offer the best freelancers for interfce design and development'
                />
                </Grid>
                <Grid item xs={8} md={3}>
                    <Listcard  service='UI/UX'
                description='we offer the best freelancers for interfce design and development'
                />
                </Grid>
                <Grid item xs={8} md={3}>
                    <Listcard  service='UI/UX'
                description='we offer the best freelancers for interfce design and development'
                />
                </Grid>
            </Grid>
        </Box>
        </Box>
        </>

    )
}
export default freelancerList
