import React from 'react'
import {Box, TextareaAutosize, TextField} from "@mui/material";
import Navbar from '../components/Navbar';
import {styles, SubmitButton, TitleText} from '../components/StyledComponents'
import FormWrapper from '../components/FormWrapper';

const contact = () => {
  return (
    <Box sx={{ 
      ...styles.header, 
      ...styles.shadow,
      height:"100vh"}}> {/* Main Wrapper */}
      <Navbar/>
      <FormWrapper> {/* Contact Form */}
        <TitleText>Contact Us</TitleText>
        <TextField placeholder='First Name'/>
        <TextField placeholder='Last Name'/>
		    <TextField placeholder='Email'/>
        <TextareaAutosize style={styles.formMessage} placeholder='Message'/>
        <SubmitButton>SEND</SubmitButton>
      </FormWrapper>
    </Box>
  )
}

export default contact;