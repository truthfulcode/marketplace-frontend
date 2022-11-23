import React from 'react'
import { Box, Grid, TextField, styled} from '@mui/material'
import Navbar from '../components/Navbar'
import Slideshow from '../components/Slideshow'
import Listcard from '../components/Listcard'
import SearchIcon from '@mui/icons-material/Search';


const proposals = () => {
    return (
            <Box  sx={{}} >
                <Navbar />
                <Slideshow />
                <Box sx={{padding:"20px 50px",
              }}>
                <TextField fullWidth label="Search" id="fullWidth" />
                <Box sx={{display:"flex"}} >
                <Grid  sx={{padding:"10px 0px"}} 
                container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                <Grid item xs={8} md={3}>
                <Listcard 
                service='UI/UX'
                description='we offer the best freelancers for interfce design and development'
                
                />
                </Grid>
                  <Grid item xs={8} md={3} >
                  <Listcard
                  
                  service='UI/UX'
                description='we offer the best freelancers for interfce design and development'
                
                  />
                      </Grid>
                      <Grid item xs={8} md={3}>
                  <Listcard 
                  service='UI/UX'
                  description='we offer the best freelancers for interfce design and development'
                  />
                      </Grid>
                      <Grid item xs={8} md={3}>
                  <Listcard 
                  service='UI/UX'
                  description='we offer the best freelancers for interfce design and development'
                  />
                      </Grid>
                      <Grid item xs={8} md={3}>
                  <Listcard 
                  service='UI/UX'
                  description='we offer the best freelancers for interfce design and development'
                  />
                      </Grid>
                      <Grid item xs={8} md={3}>
                  <Listcard 
                  service='UI/UX'
                  description='we offer the best freelancers for interfce design and development'
                  />
                      </Grid>
                </Grid>
                </Box>
                </Box>
            </Box>    
            )
}
export default proposals