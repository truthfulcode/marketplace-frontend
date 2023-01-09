import React from 'react'
import {Box, TextField} from "@mui/material";
import Navbar from '../components/Navbar';
import {styles, SubmitButton, TitleText} from '../components/StyledComponents'
import FormWrapper from "../components/FormWrapper";

const OrderListFreelancer = () => {
    return (
        <Box sx={{...styles.header, ...styles.shadow,
                backgroundImage: "url(/img/white-bg.png)",
                height:"100vh",
                backgroundRepeat:"no-repeat",
                backgroundSize: "cover",}}>
            <Navbar signUp={false} signIn={false} />
            <FormWrapper>
                <TitleText>Check client orders</TitleText>
                <TextField placeholder='Enter the order'/>
                <SubmitButton>VIEW DETAIL ORDER</SubmitButton>
            </FormWrapper>

        </Box>
      )
}

export default OrderListFreelancer