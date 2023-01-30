import { Box, Button, ButtonGroup, FormControl, Icon, IconButton, Input, List, ListItem, TextField, Typography } from '@mui/material'
import React , {useState} from 'react'
import { styles } from '../StyledComponents'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import { PaymentType } from '../../utils/types';
import Image from 'next/image';
import Form from './Form';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CryptoDeposit from './CryptoDeposit';
import CryptoWithdrawal from './CryptoWithdrawal';
const Withdraw = () => {
  const [paymentType, setPaymentType] = useState(PaymentType.Bank);
  const MainDisplay = () => {
    switch(paymentType){
      case PaymentType.Bank:{
        return <Form action="WITHDRAW"/>
      }
      default : {
        return <CryptoWithdrawal/>
      }
    }
  }
  return (
    <Box sx={{ flexDirection:"column"}}>
        <Box sx={{width:"100%",...styles.center, justifyContent:"space-around"}}>
            {["Bank","Crypto"].map((value,index)=>(
                <Button disableRipple onClick={()=>{
                    setPaymentType(index)
                }} key={index} sx={{...styles.background,color:"black",width:"100%"}} startIcon={<AccountBalanceIcon/>}>{value}</Button>
            ))}
        </Box>
        <Box sx={{...styles.center, mt:4}}>
            <MainDisplay/>
        </Box>
    </Box>
  )
}

export default Withdraw