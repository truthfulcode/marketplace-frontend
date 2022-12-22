import { Box, AppBar, Typography, Button, styled ,Paper } from '@mui/material'

import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
export const styles = {
    textCenter:{
        textAlign:"center",
    },
    header:{
        position:"relative",
        minHeight: "560px",
        padding:"16px",
    },
    shadow:{
        boxShadow: "inset 0 0 0 1000px rgba(0,0,0,.12)",
        
    },
    center:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    },
    headerContent:{
        position:"absolute",
        bottom: 0,
        left:"15%",
        padding:"32px",
        // applies on all child components
        "& > *":{
            margin:1
        }
    },
    footer:{
        flex: 1,
        padding: "2rem 0",
        borderTop: "1px solid #eaeaea",
        "& > *":{
            flexGrow: 1,
            display:"flex",
            justifyContent:"center",
            alignItems:"center"
        }
    },
    subForm:{
        "& > *":{
            width:400
        }
    }
}

// custom components styling
export const MainButton = styled(Button)({
    padding:"8px 24px",
    margin:"8px",
    backgroundColor:"#FFFFFF22",
    border:"2px solid black",
    color:"black"
})
export const SubmitButton = styled(Button)({
    padding:"8px 24px",
    margin:"8px",
    backgroundColor:"#FFFFFF22",
    border:"2px solid black",
    color:"black"
})
export const TitleText = styled(Typography)({
    textAlign:"center",
    fontWeight:"bold",
    fontSize:28,
    paddingBottom:16,
})
export const MainSplide = styled(Splide)({
    width:"100%"
})
export const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));