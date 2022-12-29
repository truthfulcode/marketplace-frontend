
import React from 'react';
import {FormHelperText,Input,InputLabel,FormControl, Container, Typography, Link, makeStyles } from '@mui/material';
import { Box, Grid, TextField, styled} from '@mui/material'
import {Card,CardActions,CardContent,CardMedia} from '@mui/material'
import Button from '@mui/material/Button';
import {FunctionComponent, PropsWithChildren} from 'react'
import  { FC } from 'react'
import {styles, SubmitButton, TitleText} from '../components/StyledComponents'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer';




const ListServices = () => {
    return(
<Container>

<FormControl>
  <InputLabel htmlFor="my-input">Email address</InputLabel>
  <Input id="my-input" aria-describedby="my-helper-text" />
  <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
</FormControl>
</Container>
)

}
export default ListServices;

