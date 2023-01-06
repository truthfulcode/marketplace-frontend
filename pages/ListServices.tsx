import React from 'react';
import { } from '@mui/material';
import {Typography, Box,Grid,TextField, styled, FormControl,FormLabel,RadioGroup,FormControlLabel,Container} from '@mui/material';
import {styles, SubmitButton, TitleText} from '../components/StyledComponents'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer';
import CustomForm from '../components/CustomForm'
import { useRouter } from "next/router";
import {Proposal} from '@prisma/client'
import { isString,sha512  } from "../utils/helpers";



const ListServices = () => {









    return(
    <Container>
        <Navbar />
        <Box sx={{...styles.center,...styles.header,
        }}>
           <CustomForm >
           <TitleText>Add new listings</TitleText>
           <TextField placeholder='Service Name'></TextField>
           <TextField placeholder='Service category'></TextField>
           <TextField placeholder='pricing' ></TextField>
           <TextField placeholder="Service Name" ></TextField>
           <TextField placeholder="Service Description"></TextField>
           <SubmitButton>submit inquiry</SubmitButton>
           </CustomForm>
        </Box>
        <Footer />
    </Container>
)
}
export default ListServices;

