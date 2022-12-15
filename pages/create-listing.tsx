import React from 'react'
import {Box, TextareaAutosize, TextField} from "@mui/material";
import Navbar from '../components/Navbar';
import {styles, SubmitButton, TitleText} from '../components/StyledComponents'
import CustomForm from '../components/CustomForm';

const createListing = () => {
  return (
    <Box sx={{ 
      ...styles.header, 
      ...styles.shadow,
      height:"100vh"}}> {/* Main Wrapper */}
      <Navbar/>
      <CustomForm> {/* Contact Form */}
        <TitleText>Create A Listing</TitleText>
        <label style={{fontWeight:"bold"}}>Title:</label><br></br>
        <TextField placeholder='Enter a suitable title...'/><br></br>
        <label style={{fontWeight:"bold"}}>Category</label><br></br>
        <select name="categ" id="categ" style={{background:"inherit", height:"50px", font:"inherit", color:"black"}}>
          <option style={{background:"inherit", height:"50px", font:"inherit"}} value="Graphics & Design">Graphics & Design</option>
          <option style={{background:"inherit", height:"50px", font:"inherit"}} value="Music & Audio">Music & Audio</option>
          <option style={{background:"inherit", height:"50px", font:"inherit"}} value="Programming & Tech">Programming & Tech</option>
          <option style={{background:"inherit", height:"50px", font:"inherit"}} value="Digital Marketing">Digital Marketing</option>
          <option style={{background:"inherit", height:"50px", font:"inherit"}} value="Business">Business</option>
          <option style={{background:"inherit", height:"50px", font:"inherit"}} value="Writing & Translation">Writing & Translation</option>
          <option style={{background:"inherit", height:"50px", font:"inherit"}} value="Data">Data</option>
          <option style={{background:"inherit", height:"50px", font:"inherit"}} value="Lifestyle">Lifestyle</option>
          <option style={{background:"inherit", height:"50px", font:"inherit"}} value="Video & Animation">Video & Animation</option>
        </select><br></br>
        <label style={{fontWeight:"bold"}}>Images:</label><br></br>
        <input type="file" id="files" name="files" multiple></input><br></br>
        <label style={{fontWeight:"bold"}}>Description:</label><br></br>
        <TextareaAutosize style={styles.formMessage} placeholder='Describe your listing...'/><br></br>
        <SubmitButton>CREATE</SubmitButton>
      </CustomForm>
    </Box>
  )
}

export default createListing;