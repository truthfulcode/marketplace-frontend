import React from 'react'
import {Box, TextField} from "@mui/material";
import Image from 'next/image'
import Navbar from '../components/Navbar';
import {styles, TitleText, MainButton} from '../components/StyledComponents'
import CustomForm from '../components/CustomForm';

const forgot = () => {
  return (
    <Box sx={{
      ...styles.header, 
      ...styles.shadow,
      height:"100vh",}}>
      <Navbar/>
      <Box sx={{...styles.center, margin:"0px", flexDirection:"column"}}>
        <Image src="/img/e404.png" alt="Error 404" height={668} width={982}/>
        <h2 style={{marginBottom:"0"}}>This is not the page you are looking for.</h2>
        <h4>It appears the page you seek does not exist.</h4>
        <MainButton href="/">Return Home</MainButton>
      </Box>
    </Box>
  )
}

export default forgot;