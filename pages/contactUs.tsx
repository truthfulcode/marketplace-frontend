import React from 'react'
import {Box, TextField} from "@mui/material";
import Navbar from '../components/Navbar';
import {styles, SubmitButton, TitleText} from '../components/StyledComponents'
import CustomForm from '../components/customForm';

const contactUs = () => {
  return (
        <Box sx={{...styles.header, ...styles.shadow,
                backgroundImage: "url(/img/white-bg.png)",
                height:"100vh",
                backgroundRepeat:"no-repeat",
                backgroundSize: "cover",}}>
            <Navbar signUp={false} signIn={false}/>
            <CustomForm>
            <TitleText>Comment and suggestions</TitleText>
                <TextField placeholder='Name'/>
		            <TextField placeholder='Email'/>
                <TextField placeholder='Message'/>
                <SubmitButton>SEND</SubmitButton>
              <TitleText>Our Contact</TitleText>
                <SubmitButton>EMAIL SUPPORT</SubmitButton>
                <SubmitButton>WHATSAPP</SubmitButton>
            </CustomForm>

        </Box>
      )
}

export default contactUs