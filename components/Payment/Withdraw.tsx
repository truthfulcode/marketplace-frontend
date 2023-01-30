import { Box, Button, ButtonGroup, 
  ListItemText,
  FormControl, Icon, IconButton, Input, List, ListItem, TextField, Typography } from '@mui/material'
import React , {useState} from 'react'
import { styles } from '../StyledComponents'
import Image from "next/image";
const Withdraw = ({balance = 0}) => {
  const [address, setAddress] = useState(
    "0x0000000000000000000000000000000000000000"
  );
  const [amount, setAmount] = useState(
    0
  );
  return (
    <Box sx={{ flexDirection:"column"}}>
        <Box sx={{...styles.center, mt:4}}>
        <Box>
      <Typography variant="h5">USDC Balance : ${balance/1e6}</Typography>
      <Typography>
        Supported Crypto
        <List sx={{ ...styles.center }}>

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
      </Typography>
      <Typography>Make sure to provide the right address, since transactions cannot be reverted!</Typography>
      <br/>
      <Box sx={{ ...styles.center }}>
        <FormControl sx={{width:"100%"}}>
          <TextField onChange={(e)=>{setAddress(e.target.value)}} label="ADDRESS" />
          <TextField onChange={(e)=>{setAmount(Number(e.target.value))}} label="AMOUNT" />
          <Button sx={{ ...styles.button, p:2, mt:2 }}>WITHDRAW</Button>
        </FormControl>
      </Box>
    </Box>
        </Box>
    </Box>
  )
}

export default Withdraw