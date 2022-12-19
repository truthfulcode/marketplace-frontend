import React from 'react'
import {Typography, Box, Grid, TextField, styled} from '@mui/material'
import Navbar from '../components/Navbar'
import {styles, SubmitButton, TitleText} from '../components/StyledComponents'
import CustomForm from '../components/CustomForm'
const signup = () => {
    return (
        <Box sx={{...styles.header, ...styles.shadow,
                backgroundImage: "url(/img/white-bg.png)",
                height:"100vh",
                backgroundRepeat:"no-repeat",
                backgroundSize: "cover",}}>
            <Navbar signUp={false}/>
            <CustomForm>
                <TitleText>SIGN UP</TitleText>
                <TextField variant="outlined" placeholder='Username'/>
                <TextField variant="outlined" placeholder='First Name'/>
                <TextField variant="outlined" placeholder='Last Name'/>
                <TextField variant="outlined" placeholder='Username'/>
                <TextField variant="outlined" placeholder='Email'/>
                <TextField variant="outlined" placeholder='Password'/>
                <TextField variant="outlined" placeholder='Phone Nmber'/>
                <TextField variant="outlined" placeholder='User Type Radio box'/>
                <SubmitButton>REGISTER</SubmitButton>
            </CustomForm>

        </Box>
      )
}


export default signup

export async function getServerSideProps(){

}