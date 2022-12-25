import { AppBar, Typography, Button, Box } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react' 
import { MainButton } from './StyledComponents'

const Navbar = ({signIn = true, signUp = true}) => {
  return (
    <Box position="static" sx={{p:0,flexDirection:"row", display:"flex", alignItems:"center", backgroundColor:"transparent"}}>
        <Box sx={{flex:1}}>
            <Image src="/img/logo.png" alt="FreeWork logo" height={48} width={164}/>
        </Box>
        <Box>
            {signIn ? 
            <Link href="signin">
                <MainButton >Sign In</MainButton>
            </Link>
            :""}
            {signUp ? 
            <Link href="signup">
                <MainButton >Sign Up</MainButton>
            </Link>
            :""}
        </Box>
    </Box>
  )
}

export default Navbar