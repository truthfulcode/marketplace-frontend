import React from 'react'
import {Box, Button, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, SelectChangeEvent, TextareaAutosize, TextField} from "@mui/material";
import Navbar from '../components/Navbar';
import Image from 'next/image'
import {styles, SubmitButton, TitleText} from '../components/StyledComponents'
import FormWrapper from '../components/FormWrapper';

const UpdateOffer = () => {
  const [time, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  return (
    <Box
      sx={{
        ...styles.header,
        ...styles.shadow,
        backgroundImage: "url(/img/white-bg.png)",
        height: "100vh",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <FormWrapper method="POST" onSubmit={() => {}}>
        <TitleText>UPDATE OFFER</TitleText>
        <FormControl fullWidth>
          <InputLabel id="time-label">Delivery Time</InputLabel>
          <Select
            id="D_T"
            value={time}
            onChange={handleChange}
            label="Delivery Time"
            displayEmpty
            >
            <MenuItem value={1}>1 Day</MenuItem>
            <MenuItem value={3}>3 Days</MenuItem>
            <MenuItem value={7}>7 Days</MenuItem>
            <MenuItem value={28}>28 Days</MenuItem>
          </Select>
        </FormControl>
        <TextField
          id="T"
          variant="outlined"
          placeholder="Title"
        />
        <TextField
          id="D"
          multiline
          rows={7}
          variant="outlined"
          placeholder="Description"
        />
        <FormControl
          sx={{ p: "14px" }}
        >
        </FormControl>
        <SubmitButton>UPDATE OFFER</SubmitButton>
      </FormWrapper>
    </Box>
  )
}

export default UpdateOffer;