import React from 'react'
import {Box, TextField} from "@mui/material";
import Navbar from '../components/Navbar';
import {styles, SubmitButton, TitleText} from '../components/StyledComponents'
import FormWrapper from '../components/FormWrapper';

const Forgot = () => {
  return (
    <Box sx={{
      ...styles.header, 
      ...styles.shadow,
      height:"100vh",}}>
      <Navbar/>
      <FormWrapper method={()=>{}} onSubmit={()=>{}}>
        <TitleText>Reset Password</TitleText>
        <TextField placeholder='Email | Username'/>
        <SubmitButton>RESET</SubmitButton>
      </FormWrapper>
    </Box>
  )
}

export default Forgot;