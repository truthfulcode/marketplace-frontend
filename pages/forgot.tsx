import React from 'react'
import {Box, TextField} from "@mui/material";
import Navbar from '../components/Navbar';
import {styles, SubmitButton, TitleText} from '../components/StyledComponents'
import CustomForm from '../components/CustomForm';

const forgot = () => {
  return (
    <Box sx={{
      ...styles.header, 
      ...styles.shadow,
      height:"100vh",}}>
      <Navbar/>
      <CustomForm>
        <TitleText>Reset Password</TitleText>
        <TextField placeholder='Email | Username'/>
        <SubmitButton>RESET</SubmitButton>
      </CustomForm>
    </Box>
  )
}

export default forgot;