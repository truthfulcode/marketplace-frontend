import React from 'react'
import {Typography, Box, Grid, TextField, styled} from '@mui/material'
import Navbar from '../components/Navbar'
import {styles, SubmitButton, TitleText} from '../components/StyledComponents'
import CustomForm from '../components/CustomForm'

const signIn = () => {
  return (
    <Box sx={{
            ...styles.header, 
            ...styles.shadow,
            height:"100vh",}}>
        <Navbar signIn={false}/>
            <CustomForm>
                <TitleText>SIGN IN</TitleText>
                <TextField variant="outlined" placeholder='Email | Username'/>
                <TextField variant="outlined" placeholder='Password'/>
                <SubmitButton>SIGN IN</SubmitButton>
            </CustomForm>
    </Box>
  )
}

export default signIn