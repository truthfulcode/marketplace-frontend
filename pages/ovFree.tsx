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
      <TitleText>View client orders by</TitleText>
      <SubmitButton>All orders</SubmitButton>
      <SubmitButton>Active orders</SubmitButton>
      <SubmitButton>Unpaid orders</SubmitButton>
      <SubmitButton>Unfulfilled orders</SubmitButton>
      <SubmitButton>Completed orders</SubmitButton>
  </CustomForm>

</Box>
  )
}

export default OrderViewFreelancer