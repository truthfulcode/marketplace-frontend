import React from 'react'
import {Box, Button, TextareaAutosize, TextField} from "@mui/material";
import Navbar from '../components/Navbar';
import Image from 'next/image'
import {styles, SubmitButton, TitleText} from '../components/StyledComponents'

const ViewListingDetails = () => {
  return (
    <Box sx={{ 
        ...styles.header, 
        ...styles.shadow,
        minHeight:"100vh", height:"auto"}}> {/* Main Wrapper */}
        <Navbar/>
        <Box sx={{...styles.center, marginTop:"100px;"}}>
          <TextField style={{width:"600px", outline:"none", borderRadius:"100px", border:"none", marginRight:"0"}} placeholder="Search listings..."></TextField>
          <Button style={{background:"#355C7D", marginLeft:"0px", height:"60px", borderRadius:"0", width:"auto", backgroundImage:'url("/img/search.png")', backgroundRepeat:"no-repeat", backgroundSize:"30px", backgroundPosition:"center"}}></Button>
        </Box>
        <Box sx={{...styles.center}}>
          <Box sx={{display:"grid", gridTemplateColumns:"repeat( auto-fit, minmax(300px, 1fr) );", marginTop:"50px;", width:"auto", minHeight:"600px", height:"auto", marginLeft:"0"}}>
            <Box sx={{...styles.listingBox, ...styles.subForm, borderRadius:2, border:"2px solid black", width:"25vw", height:"auto"}}><a href="#">
              <Image src="/img/listing.webp" alt="Listing Image" height={200} width={283}/>
                <Box sx={{...styles.center}}><Image src="/img/profile.jpg" alt="Listing Image" height={32} width={32} style={{...styles.profileIconBox, marginTop:"10px", borderWidth:"0px"}}/>
                  <TitleText style={{marginLeft:"10px", marginTop:"5px", fontSize: "10pt"}}>Username</TitleText>
                </Box>
                <p style={{textAlign:"center", marginTop:"-21px"}}>Lorem ipsum dolor, sit amet consectetur adipisicing.</p>
                  <Box sx={{...styles.center, marginBottom:"0", height:"50px", borderTop:"1px solid black"}}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ffbe5b" className="bi bi-star-fill" viewBox="0 0 16 16"> <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/></svg>
                    <TitleText style={{marginLeft:"5px", fontSize:"10pt", marginBottom:"-15px"}}>4.5 (158) - $50</TitleText>
                  </Box></a>
            </Box>
          </Box>
        </Box>
      </Box>
  )
}

export default ViewListingDetails