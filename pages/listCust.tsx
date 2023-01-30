import React, { useState } from "react";
import {Box, Button, TextareaAutosize, TextField, Grid, Typography} from "@mui/material";
import Navbar from '../components/Navbar';
import Image from 'next/image'
import {styles, SubmitButton, TitleText} from '../components/StyledComponents'

const OrderListCustomer = () => {
  return (
    <Box sx={{ 
      ...styles.header, 
      ...styles.shadow,
      minHeight:"100vh", height:"auto"}}> {/* Main Wrapper */}
      <Navbar/>
      <Box sx={{...styles.center, marginTop:"50px;"}}>
        <TextField style={{width:"600px", outline:"100px", borderRadius:"100px", border:"none", marginRight:"0"}} placeholder="Search orders..."></TextField>
        <Button style={{background:"#355C7D", marginLeft:"0px", height:"60px", borderRadius:"0", width:"80px", backgroundImage:'url("/img/search.png")', backgroundRepeat:"no-repeat", backgroundSize:"30px", backgroundPosition:"center"}}></Button>
      </Box>
      <Box sx={{...styles.center}}>
        <Box sx={{display:"grid", gridTemplateColumns:"repeat( auto-fit, minmax(300px, 1fr) );", marginTop:"50px;", width:"50vw", minHeight:"600px", height:"auto", marginLeft:"0"}}>
          <Box sx={{...styles.listingBox}}><a href="#">Order 1<Box sx={{...styles.center}}><TitleText style={{marginLeft:"10px", marginTop:"5px", fontSize: "20pt"}}>Order Tittle</TitleText></Box><p style={{textAlign:"center", marginTop:"-21px"}}>Lorem ipsum dolor, sit amet consectetur adipisicing.</p><Box sx={{...styles.center, marginBottom:"0", height:"50px", borderTop:"1px solid black"}}><TitleText style={{marginLeft:"5px", fontSize:"10pt", marginBottom:"-15px"}}>$45</TitleText></Box></a></Box>
          <Box sx={{...styles.listingBox}}><a href="#">Order 2<Box sx={{...styles.center}}><TitleText style={{marginLeft:"10px", marginTop:"5px", fontSize: "20pt"}}>Order Tittle</TitleText></Box><p style={{textAlign:"center", marginTop:"-21px"}}>Lorem ipsum dolor, sit amet consectetur adipisicing.</p><Box sx={{...styles.center, marginBottom:"0", height:"50px", borderTop:"1px solid black"}}><TitleText style={{marginLeft:"5px", fontSize:"10pt", marginBottom:"-15px"}}>$45</TitleText></Box></a></Box>
          <Box sx={{...styles.listingBox}}><a href="#">Order 3<Box sx={{...styles.center}}><TitleText style={{marginLeft:"10px", marginTop:"5px", fontSize: "20pt"}}>Order Tittle</TitleText></Box><p style={{textAlign:"center", marginTop:"-21px"}}>Lorem ipsum dolor, sit amet consectetur adipisicing.</p><Box sx={{...styles.center, marginBottom:"0", height:"50px", borderTop:"1px solid black"}}><TitleText style={{marginLeft:"5px", fontSize:"10pt", marginBottom:"-15px"}}>$45</TitleText></Box></a></Box>
          <Box sx={{...styles.listingBox}}><a href="#">Order 4<Box sx={{...styles.center}}><TitleText style={{marginLeft:"10px", marginTop:"5px", fontSize: "20pt"}}>Order Tittle</TitleText></Box><p style={{textAlign:"center", marginTop:"-21px"}}>Lorem ipsum dolor, sit amet consectetur adipisicing.</p><Box sx={{...styles.center, marginBottom:"0", height:"50px", borderTop:"1px solid black"}}><TitleText style={{marginLeft:"5px", fontSize:"10pt", marginBottom:"-15px"}}>$45</TitleText></Box></a></Box>
        </Box>
      </Box>
    </Box>
  )
}

export default OrderListCustomer
