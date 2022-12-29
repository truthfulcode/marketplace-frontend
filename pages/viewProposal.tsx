import React from 'react';
import { Container, Typography, Link, makeStyles } from '@mui/material';
import { Box, Grid, TextField, styled} from '@mui/material'
import {Card,CardActions,CardContent,CardMedia} from '@mui/material'
import Button from '@mui/material/Button';
import {FunctionComponent, PropsWithChildren} from 'react'
import  { FC } from 'react'
import {styles, SubmitButton, TitleText} from '../components/StyledComponents'
import Navbar from '../components/Navbar'



const ViewProposal = ()=>{
  return(
    <Container>
      <Navbar />
      <Grid container
          direction="row"
          justifyContent="center"
          alignItems="center"
          marginTop={5}
          marginRight={5}
          spacing={5}
  >

      <Grid  item xs={3}>
      <Typography sx={{...styles.center}} variant='h2' >UI/UX</Typography></Grid>
      <Grid  item xs={3}>
      <Typography sx={{...styles.center}} variant='h5' >Im intoducing the best UI/UX designs </Typography>
      </Grid>
     {/**<Image src="my-self.jpeg" sx={{ borderRadius: 16 }} />**/}
     <Grid  item xs={3}>
     <img src="/img/luke-peters-B6JINerWMz0-unsplash.jpg" style={{borderRadius: 20,width:"300px"}} />
     </Grid>
     </Grid>
     <Box>
     <Typography
     margin={10}
     variant={'h4'}

     >About Me</Typography>
      <Typography>Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Voluptates, perspiciatis laborum harum minima, corporis repudiandae 
        ipsa perferendis natus quos rerum consequuntur 
        doloribus dolore! Facere repellat laboriosam dolore quo quis nostrum.</Typography>

      </Box>
  </Container>
  )


}
export default ViewProposal;
