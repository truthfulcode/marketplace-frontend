import { AppBar, Typography, Button, styled } from '@mui/material'
import { blue } from '@mui/material/colors'
// general styling
export const styles = {
    textCenter:{
        textAlign:"center",
    },
    sideBarText:{
        width:"100%",
        textAlign:"center"
    },
    text:{

    },
    button:{
        color:"black",
        backgroundColor:"#E9DAC1"
    },
    background:{
        backgroundColor:"#E9DAC1"
    },
    textBackground:{
        backgroundColor:"#F7ECDE"
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
    right:{
        display:"flex",
        justifyContent:"right",
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
    },
    formMessage:{
        background: "inherit",
        minHeight: "10vh",
        color: "black",
        font: "inherit",
        padding: "10px"
    },
    wrapper:{
        marginTop:"50px !important",
        border:"1px solid lightgrey",
        borderRadius:"15px",
        boxShadow: "0 10px 16px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%) !important"
    },
    profileIconBox:{
        borderRadius:"50%",
        marginBottom:"25px",
        border: "7px solid #07aee6"
    },
    profileName:{
        fontWeight:"bold",
        fontSize:28,
        paddingBottom:16,
    },
    profileDesc:{
        font: "inherit",
        textAlign:"left",
        paddingBottom:16,
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