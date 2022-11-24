import React from 'react'
import {Box, TextField} from "@mui/material";
import Navbar from '../components/Navbar';
import {styles, SubmitButton, TitleText} from '../components/StyledComponents'
import CustomForm from '../components/customForm';

const OrderViewFreelancer = () => {
  return (
    <Box sx={{...styles.header, ...styles.shadow,
      backgroundImage: "url(/img/white-bg.png)",
      height:"100vh",
      backgroundRepeat:"no-repeat",
      backgroundSize: "cover",}}>
  <Navbar signUp={false} signIn={false} />
  <CustomForm>
      <TitleText>View order by</TitleText>
      <SubmitButton>Client name</SubmitButton>
      <SubmitButton>Active order</SubmitButton>
      <SubmitButton>Unpaid order</SubmitButton>
      <SubmitButton>Unfulfilled order</SubmitButton>
  </CustomForm>

</Box>
  )
}

export default OrderViewFreelancer