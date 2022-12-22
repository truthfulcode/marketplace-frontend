import { Box, Button, ButtonGroup, FormControl, Icon, IconButton, Input, List, ListItem, TextField, Typography } from '@mui/material'
import React , {useState} from 'react'
import { styles } from '../StyledComponents'
import Image from 'next/image';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
const CryptoDeposit = () => {
    const [address, setAddress] = useState("0x0000000000000000000000000000000000000000")
    return (
    <Box>
        <Typography variant='h5'>Balance : DAI: 0 | USDT: 0 | USDC: 0</Typography>
        <Typography>
            Supported Crypto
            <List sx={{...styles.center}}>
                {["DAI","USDT","USDC"].map((value,index)=>(
                    <ListItem sx={{...styles.center}}>
                        <Image src={"/img/"+value+".png"} width={48} height={48} alt={value}/>
                    </ListItem>
                ))}
            </List>
        </Typography>
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
  )};

export default CryptoDeposit