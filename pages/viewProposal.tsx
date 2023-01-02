import React from 'react';
import { Container, Typography, Link, makeStyles } from '@mui/material';
import { Box, Grid, TextField, styled} from '@mui/material'
import Button from '@mui/material/Button';
import {FunctionComponent, PropsWithChildren} from 'react'
import  { FC } from 'react'
import {styles, SubmitButton, TitleText} from '../components/StyledComponents'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer';


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
     margin={2}
     variant={'h4'}
     >About Me</Typography>
      <hr className="solid" />
      <Typography
      marginBottom={3}
      >Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Voluptates, perspiciatis laborum harum minima, corporis repudiandae 
        ipsa perferendis natus quos rerum consequuntur 
        doloribus dolore! Facere repellat laboriosam dolore quo quis nostrum.</Typography>
        <br/>
      <Typography 
       variant={'h4'}
      >Freelancer Email</Typography>
      <a   href="mailto:">mond1alaa111@gmail.com</a><br/>
      <br/> 
      <Typography 
       variant={'h4'}
       marginBottom={1}
      >Freelancer Cost</Typography>
        <p>300 $</p>
       <Button variant="contained">Pay now</Button>
      </Box>
      <Footer />
  </Container>
  )
}
export default ViewProposal;
