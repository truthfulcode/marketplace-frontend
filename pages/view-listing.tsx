import React from 'react'
import {Box, TextareaAutosize, TextField} from "@mui/material";
import Navbar from '../components/Navbar';
import {styles, SubmitButton, TitleText} from '../components/StyledComponents'
import CustomForm from '../components/CustomForm';
import Image from 'next/image'

function viewListing() {
  return (
    <Box sx={{
      ...styles.header,
      ...styles.shadow,
      height: "100vh"
    }}> {/* Main Wrapper */}
      <Navbar />
      <CustomForm> {/* Contact Form */}
        <TitleText>View Listing</TitleText>
        <label style={{ fontWeight: "bold" }}>Title:</label><br></br>
        <label>Listing XYZ</label><br></br>
        <label style={{ fontWeight: "bold" }}>Category:</label><br></br>
        <label>Business</label><br></br>
        <label style={{ fontWeight: "bold" }}>Payment</label><br></br>
        <label>$50.00</label><br></br>
        <label style={{ fontWeight: "bold" }}>Delivery Period:</label><br></br>
        <label>48 hours</label><br></br>

        <label style={{ fontWeight: "bold" }}>Image(s):</label><br></br>
        <Image src={"/mypic.png"} alt="business image" height={250} width={145} />
        <label style={{ fontWeight: "bold" }}>Description:</label><br></br>
        <label>Business Listing XYZ is about....<br></br></label><br></br><br></br>
        <br></br><select name="act" id="act" style={{ background: "inherit", height: "25px", width: "75px", font: "inherit", color: "black" }}>
          <option style={{ background: "inherit", height: "25px", font: "inherit" }} value="Action">Action</option>
          <option style={{ background: "inherit", height: "25px", font: "inherit" }} value="Renew">Renew</option>
          <option style={{ background: "inherit", height: "25px", font: "inherit" }} value="Cancel">Cancel</option>
        </select><br></br>
      </CustomForm>
    </Box>
  );
}

export default viewListing;