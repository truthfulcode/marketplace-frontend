import { Button, FormControl, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { DesktopDatePicker } from '@mui/x-date-pickers'
import Image from 'next/image'
import React from 'react'
import { styles } from '../StyledComponents'
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const Form = ({action = ""}) => {
    const [value, setValue] = React.useState<Dayjs | null>(
      dayjs('2014-08-18T21:11:54'),
    );

    const handleChange = (newValue: Dayjs | null) => {
      setValue(newValue);
    };
  return (
    <Box sx={{...styles.center, flexDirection:"column"}}>
    <Typography variant='h5'>Balance : 0$</Typography>
    <FormControl>
        <TextField label='Card Number'/>
        <TextField label='CVV'/>
        <TextField label='Owner'/>
        <TextField label='Amount'/>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="Expiry Date"
              inputFormat="MM/YYYY"
              value={value}
              onChange={handleChange}
              renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
        <Button sx={{...styles.button}}>{action}</Button>
        <Box sx={{...styles.center, mt:2}}>
            <Image src="/img/bank.png" alt="visa mastercard american bank" width={100} height={20}/>
        </Box>
    </FormControl>
    </Box>
  )
}

export default Form