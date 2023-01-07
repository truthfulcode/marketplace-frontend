import React, { useState } from "react";
import {Typography, Box,Grid,TextField, styled, FormControl,FormLabel,RadioGroup,FormControlLabel,Container, formControlClasses} from '@mui/material';
import {styles, SubmitButton, TitleText} from '../components/StyledComponents'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer';
import CustomForm from '../components/CustomForm'
import { useRouter } from "next/router";
import {Proposal} from '@prisma/client'
import { isString,sha512  } from "../utils/helpers";
import FormWrapper from "../components/FormWrapper";
import { setFlagsFromString } from "v8";


const createProposal = () => {

   const [form ,setForm] = useState<FormData>({title: '' ,description: '',id: '',duration: 0,pricing: 0.0 ,status: true})
   const router = useRouter();
   interface FormData {
    title : string
    description: string
    id: string
    duration: Number
    price : Number
    status :boolean
   }
    


    return(
    <Container>
        <Navbar />
        <Box sx={{...styles.center,...styles.header,
        }}>
           <form onSubmit={
            e =>{
                e.preventDefault()
            } 
           }>
           <TitleText>Add new listings</TitleText>
           <TextField
           type="text"
           placeholder='Service Name'
           value={form.title}
           onChange={e => setForm({...form,title:e.target.value})}
           />
           {/*<TextField
           placeholder='Service Name'
            ></TextField>*/}
           <TextField 
           placeholder='Service category'
           value={form.description}
           onChange={e => setForm({...form,description:e.target.value})}
           />
           <TextField placeholder='pricing' ></TextField>
           <TextField placeholder="Service Name" ></TextField>
           <TextField placeholder="Service Description"></TextField>
           <button type="submit">submit inquiry</button>
           </form>
        </Box>
        <Footer />
    </Container>
)
}
export default createProposal;

