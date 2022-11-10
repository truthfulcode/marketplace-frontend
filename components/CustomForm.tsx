import React from 'react'
import {Box} from "@mui/material"
import { styles } from './StyledComponents'
// @ts-ignore
const CustomForm = ({children}) => {
  return (
    <Box sx={{...styles.center, height:"90%"}}>
        <Box sx={{p:"8px", borderRadius:2, 
                ...styles.center,flexDirection:"column", ...styles.subForm, border:"2px solid black" }}>
            {children}
        </Box>
    </Box>
  )
}

export default CustomForm