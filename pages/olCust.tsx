import React from 'react'
import {Box, TextField} from "@mui/material";
import Navbar from '../components/Navbar';
import {styles, SubmitButton, TitleText} from '../components/StyledComponents'
import CustomForm from '../components/customForm';

const OrderListCustomer = () => {
  return (
    <Box sx={{...styles.header, ...styles.shadow,
            backgroundImage: "url(/img/white-bg.png)",
            height:"100vh",
            backgroundRepeat:"no-repeat",
            backgroundSize: "cover",}}>
        <Navbar signUp={false} signIn={false} />
        <CustomForm>
            <TitleText>Check your order</TitleText>
            <TextField placeholder='Enter your order'/>
            <SubmitButton>VIEW HISTORY ORDER</SubmitButton>
        </CustomForm>

    </Box>
  )
}

export default OrderListCustomer