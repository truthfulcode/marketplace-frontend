import React from 'react'
import {Box} from "@mui/material"
import { styles } from './StyledComponents'
import FormGroup from '@mui/material/FormGroup';
// @ts-ignore
const FormWrapper = ({children,method,onSubmit}) => {
  return (
    <Box sx={{...styles.center, height:"90%"}}>
        <Box sx={{p:"8px", borderRadius:2, 
                ...styles.center,flexDirection:"column", ...styles.subForm, border:"2px solid black" }}>
            <form method={method} onSubmit={onSubmit}>
              <FormGroup>
                {children}
              </FormGroup>
            </form>
        </Box>
    </Box>
  )
}

export default FormWrapper