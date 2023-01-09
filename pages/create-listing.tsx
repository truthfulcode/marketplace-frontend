import React from "react";
import { Box, TextareaAutosize, TextField, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import Navbar from "../components/Navbar";
import {
  styles,
  SubmitButton,
  TitleText,
} from "../components/StyledComponents";
import FormWrapper from "../components/FormWrapper";

const createListing = () => {
    const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };
  return (
    <Box
      sx={{
        ...styles.header,
        ...styles.shadow,
        height: "100vh",
      }}
    >
      {" "}
      {/* Main Wrapper */}
      <Navbar />
      <FormWrapper method="POST" onSubmit={() => {}}>
        {" "}
        {/* Contact Form */}
        <TitleText>Create A Listing</TitleText>
        <TextField placeholder="Title" />
        <TextField placeholder="Price" type="number" />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value="Design">Graphics & Design</MenuItem>
            <MenuItem value="Music">Music & Audio</MenuItem>
            <MenuItem value="Programming">Programming & Tech</MenuItem>
            <MenuItem value="Marketing">Digital Marketing</MenuItem>
            <MenuItem value="Business">Business</MenuItem>
            <MenuItem value="Writing">Writing & Translation</MenuItem>
            <MenuItem value="Data">Data</MenuItem>
            <MenuItem value="Lifestyle">Lifestyle</MenuItem>
            <MenuItem value="Video">Video & Animation</MenuItem>
          </Select>
        </FormControl>
        <br></br>
        <label style={{ fontWeight: "bold" }}>Images:</label>
        <br></br>
        <input type="file" id="files" name="files" multiple></input>
        <br></br>
        <TextareaAutosize
          style={styles.formMessage}
          placeholder="Description"
        />
        <br></br>
        <SubmitButton>CREATE</SubmitButton>
      </FormWrapper>
    </Box>
  );
};

export default createListing;
