import React from 'react';
import { Container, Typography, Link } from '@mui/material';
import { Box, Grid, TextField, styled} from '@mui/material'
import {Card,CardActions,CardContent,CardMedia} from '@mui/material'
import Button from '@mui/material/Button';
import {FunctionComponent, PropsWithChildren} from 'react'
import  { FC } from 'react'
import {styles, SubmitButton, TitleText} from '../components/StyledComponents'
import Navbar from '../components/Navbar'

interface Props {
  name: string;
  address: string;
  phoneNumber: string;
  hours: string;
  website: string;
  facebookUrl: string;
  twitterUrl: string;
  instagramUrl: string;
}

const ViewProposal: React.FC<Props> = ({
  name,
  address,
  phoneNumber,
  hours,
  website,
  facebookUrl,
  twitterUrl,
  instagramUrl,
}) => {
  return (
    <Container>
        <Navbar />
       <Typography sx={{...styles.center}} variant="h2" align="center" gutterBottom>
        UI/UX
      </Typography>
      <Box sx={{...styles.center}}>
        <img src="/img/luke-peters-B6JINerWMz0-unsplash.jpg" alt="" width={"200px"} />
        </Box>

    <Box sx={{...styles.center}} >
      <Typography sx={{}} variant="h4" align="center" gutterBottom>
        {name}
      </Typography>
      <Typography variant="h6" align="center" gutterBottom>
        {address}
      </Typography>
      <Typography variant="h6" align="center" gutterBottom>
        {phoneNumber}
      </Typography>
      <Typography variant="h5" gutterBottom>
        Hours
      </Typography>
      <Typography variant="body1">{hours}</Typography>
      <Typography variant="h5" gutterBottom>
        Website
      </Typography>
      <Link href={website}>{website}</Link>
      <Typography variant="h5" gutterBottom>
        Social Media
      </Typography>
      <ul>
        <li>
          <Link href={facebookUrl}>Facebook</Link>
        </li>
        <li>
          <Link href={twitterUrl}>Twitter</Link>
        </li>
        <li>
          <Link href={instagramUrl}>Instagram</Link>
        </li>
      </ul>
      </Box>
    </Container>
  );
};

export default ViewProposal;
