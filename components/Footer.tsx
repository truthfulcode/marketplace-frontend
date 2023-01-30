import Head from 'next/head'
import Image from 'next/image'
import {styles, TitleText} from '../components/StyledComponents'
import {Typography, Box, Grid, TextField, styled} from '@mui/material'

const Footer = ({signIn = true, signUp = true}) => {
  return (
    <footer style={{...styles.footer, ...styles.center}}>
        <a>
            <span style={{
            height: "1em",
            marginLeft: "0.5rem",
            flexDirection:"column",
            ...styles.center
            }}>
            <Image src="/img/LOGO.png" alt="Logo" width={164} height={48} />
            <Typography>© 2022 - All Rights Reserved.</Typography>
            </span>
        </a>
    </footer>
  )
}

export default Footer