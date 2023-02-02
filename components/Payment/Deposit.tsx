import { Box, Button, ButtonGroup, FormControl, Icon, IconButton, Input, List, ListItem, ListItemText, TextField, Typography } from '@mui/material'
import React , {useEffect, useState} from 'react'
import Image from 'next/image';
import { styles } from '../StyledComponents'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
const Deposit = ({address,balance=0}) => {
  const [_balance,_setBalance] = useState(0)
  useEffect(()=>{
    _setBalance(balance/1e6)
  },[balance])
  return (
    <Box sx={{ flexDirection:"column"}}>
        <Box sx={{...styles.center, mt:4}}>
        <Box>
        <Typography variant='h5'>USDC Balance: ${_balance}</Typography>
        <Typography>
            Supported Crypto
        </Typography>
            <List sx={{...styles.center}}>
            <ListItem sx={{ ...styles.center, flexDirection:"column" }}>
              <Image
                src={"/img/USDC.png"}
                width={48}
                height={48}
                alt="USDC"
              />
              <ListItemText>USDC</ListItemText>
            </ListItem>
            </List>
        <Typography>Make sure to transfer the supported crypto to the following address:</Typography>
        <Typography>Deposits reflect within 1-2 minutes:</Typography>
        <Box  sx={{...styles.center, p:4, mt:4, ...styles.textBackground}}>
            <Typography >{address}</Typography>
            <IconButton onClick={()=>{
                navigator.clipboard.writeText(address)
            }}>
                <ContentCopyIcon/>
            </IconButton>
        </Box>
    </Box>
        </Box>
    </Box>
  )
}
export default Deposit