import React from 'react'
import { Box, Grid, TextField, styled} from '@mui/material'
import Navbar from '../components/Navbar'
import Slideshow from '../components/Slideshow'
import Listcard from '../components/Listcard'
import Paper from '@mui/material/Paper';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


const proposals = () => {
    return (
            <Box  sx={{}} >
                <Navbar />
                <Slideshow />
                <Box sx={{padding:"20px 50px"}}>
                <TextField fullWidth label="Search" id="fullWidth" />
                
                <Grid  sx={{padding:"10px 0px"}} container spacing={2}>
                <Grid item xs={8}>
                <Listcard />
                </Grid>
                  <Grid item xs={8}>
                  <Listcard />
                      </Grid>
                </Grid>
                </Box>
            </Box>    
            )
}
export default proposals