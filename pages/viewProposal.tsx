import React from 'react';
import { Container, Typography, Link } from '@mui/material';
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
      <Grid
  
></Grid>
      <Grid container
  direction="column"
  justifyContent="center"
  alignItems="center"
  spacing={4}
  >

      <Grid  item xs={3}>
      <Typography sx={{...styles.center}} variant='h2' >UI/UX</Typography></Grid>
      <Grid  item xs={3}>
      <Typography sx={{...styles.center}} variant='h5' >Im intoducing the best UI/UX designs </Typography>
      </Grid>
     {/**<Image src="my-self.jpeg" sx={{ borderRadius: 16 }} />**/}
     <Grid  item xs={3}>
     <img src="/img/luke-peters-B6JINerWMz0-unsplash.jpg" style={{borderRadius: 16,width:"300px"}} />
     </Grid>
     </Grid>
  </Container>
  )








}
export default ViewProposal;
