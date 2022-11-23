import Head from 'next/head'
import Image from 'next/image'
import Navbar from '../components/Navbar'
import {styles, TitleText} from '../components/StyledComponents'
import {Typography, Box, Grid, TextField, styled} from '@mui/material'

export default function Home() {
  const CategoryText = styled(Typography)({
    color:"black"
  })
  
  return (
    <div >
      <Head>
        <title>FreeWork Marketplace</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box sx={{...styles.header, ...styles.shadow, 
      backgroundImage: "url(/img/freelancer-person.png)",
      backgroundRepeat:"no-repeat",
      backgroundPosition: "80% 100%",
      backgroundSize: "auto",
      }}>
        <Navbar/>
          <Box sx={styles.headerContent}>
            <Typography fontSize={32}>Looking for a freelancer? <br/> We've got your back.</Typography>
            <TextField inputProps={{
              style:{
                padding:12
              }
            }} variant="filled" sx={{width:"100%", backgroundColor:"white",borderRadius:2}} placeholder='Try "Web designer"'/>
          </Box>
      </Box>
      <Box p={2}>
        <TitleText>
          POPULAR CATEGORIES
        </TitleText>
        <Grid container spacing={2}>
          {["Web Design","Programming","Audio & Music","Business","Writing & Translation","Marketing",].map((value,index)=>(
            <Grid item sx={{flexDirection:"column", ...styles.center }} xs={4}>
              <Box sx={{border:"2px solid black",borderRadius:16, p:2, m:1}}>
                <Image width={40} height={40} alt="category image" src={"/img/landing-categories/landingCategory"+(index).toString()+".png"}/>
              </Box>
              <CategoryText fontSize={24} sx={styles.textCenter}>{value}</CategoryText></Grid>
          ))}
        </Grid>
      </Box>
      <footer style={{...styles.footer, ...styles.center, ...styles.shadow}}>
        <a>
          <span style={{
            height: "1em",
            marginLeft: "0.5rem",
            flexDirection:"column",
            ...styles.center
          }}>
            <Image src="/img/LOGO.png" alt="Logo" width={164} height={48} />
            <CategoryText>© 2022 - All Rights Reserved.</CategoryText>
          </span>
        </a>
      </footer>
    </div>
  )
}
