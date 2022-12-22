import React, { useState } from 'react'
import {Typography, Box, Grid, TextField, styled} from '@mui/material'
import Navbar from '../components/Navbar'
import {styles, SubmitButton, TitleText} from '../components/StyledComponents'
import CustomForm from '../components/CustomForm'
import { Account, AccountType } from '@prisma/client'
import { isString, sha512 } from '../utils/helpers'
type FormInput = "USERNAME" | "FIRST_NAME" | "LAST_NAME" | "EMAIL" | "PASSWORD" | "PHONE_NUMBER" | "USER_TYPE"
const signup = () => {
    const [account, setAccount] = useState(new Map<FormInput,String>())
    const createUser = async () => {
        const _account:Account = {
            id:"",
            username:account.get('USERNAME') as string,
            firstName:account.get('FIRST_NAME') as string,
            lastName:account.get('LAST_NAME') as string,
            email:account.get('EMAIL') as string,
            password:sha512(account.get('PASSWORD') as string),
            phoneNumber:account.get('PHONE_NUMBER') as string,
            accountType:account.get('USER_TYPE') as AccountType
        }
        try{
            fetch('./api/user', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(_account),
              }).then((res)=>{
                console.log(res.ok ? "PASSED" : "ERROR OCCURED")
              })
        }catch(err){
            console.error(err)
        }
    }
    const setAccVal = (key:FormInput, event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let _account: Map<FormInput,String> = account;
        _account.set(key,event.target.value)
        setAccount(_account);
    }
    return (
        <Box sx={{...styles.header, ...styles.shadow,
                backgroundImage: "url(/img/white-bg.png)",
                height:"100vh",
                backgroundRepeat:"no-repeat",
                backgroundSize: "cover",}}>
            <Navbar signUp={false}/>
            <CustomForm>
                <TitleText>SIGN UP</TitleText>
                <TextField onChange={(e)=>setAccVal("USERNAME",e)} variant="outlined" placeholder='Username'/>
                <TextField onChange={(e)=>setAccVal("FIRST_NAME",e)} variant="outlined" placeholder='First Name'/>
                <TextField onChange={(e)=>setAccVal("LAST_NAME",e)} variant="outlined" placeholder='Last Name'/>
                <TextField onChange={(e)=>setAccVal("PASSWORD",e)} variant="outlined" placeholder='Password'/>
                <TextField onChange={(e)=>setAccVal("EMAIL",e)} variant="outlined" placeholder='Email'/>
                <TextField onChange={(e)=>setAccVal("PHONE_NUMBER",e)} variant="outlined" placeholder='Phone Nmber'/>
                <TextField onChange={(e)=>setAccVal("USER_TYPE",e)} variant="outlined" placeholder='User Type Radio box'/>
                <SubmitButton onClick={createUser}>REGISTER</SubmitButton>
            </CustomForm>

        </Box>
      )
}


export default signup;