
import React from 'react';
import {FormLabel,FormHelperText,Input,InputLabel,FormControl, Container, Typography, Link, makeStyles } from '@mui/material';
import { Box, Grid, TextField, styled} from '@mui/material'
import {Card,CardActions,CardContent,CardMedia} from '@mui/material'
import Button from '@mui/material/Button';
import {FunctionComponent, PropsWithChildren} from 'react'
import  { FC } from 'react'
import {styles, SubmitButton, TitleText} from '../components/StyledComponents'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer';
import CustomForm from '../components/CustomForm'


const ListServices = () => {
    return(
    <Container>
        <Navbar />
        <Box sx={{...styles.center,...styles.header,
        }}>
           <CustomForm>
           <TitleText>Add new listings</TitleText>
           <TextField placeholder='Service Name'></TextField>
           <TextField placeholder='Service category'></TextField>
           <TextField placeholder='pricing' ></TextField>
           <TextField placeholder="Service Name" ></TextField>
           <TextField placeholder="Service Description"></TextField>
           <SubmitButton>submit inquiry</SubmitButton>
           </CustomForm>
        </Box>
        <Footer />
    </Container>
)

}
export default ListServices;

