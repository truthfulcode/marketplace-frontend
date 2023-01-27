import React, { useState } from "react";
import { Typography, Box, Grid, TextField, styled, FormControl, FormLabel, RadioGroup, FormControlLabel, Container, formControlClasses, Button } from '@mui/material';
import { styles, SubmitButton, TitleText } from '../components/StyledComponents'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer';

import { useRouter } from "next/router";


const createProposal = () => {
    const [form, setForm] = useState<FormData>({ title: '', description: '', id: '', duration: 0, price: 0.0, status: true })
    const router = useRouter();
    interface FormData {
        title: string
        description: string
        id: string
        duration: number
        price: number
        status: boolean
    }
    async function create(data: FormData) {
        try {
            fetch('./api/create', {
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST'
            }).then(() => setForm({ title: '', description: '', id: '', duration: 0, price: 0.0, status: true }))
        } catch {
            console.log('error');
        }
    }
    const handleSubmit = async (data:FormData) => {
   
       create(data)
      
      }

        return (
            <Container>
                <Navbar />
                <Box sx={{
                    ...styles.center, ...styles.wrapper, ...styles.textCenter
                    , margin: 47, padding: 10
                }}>

                    <form
                        onSubmit={
                            e => {
                                e.preventDefault(),
                                handleSubmit(form)

                            }
                        }>
                        <TitleText>Add new Proposal</TitleText>
                        <label htmlFor="">Service Name</label>
                        <TextField
                            sx={{ padding: "9" }}
                            type="text"
                            placeholder='Service Name'
                            value={form.title}
                            onChange={(e) => { setForm({ ...form, title: e.target.value }) }}
                        />
                       

                        <label htmlFor="">pricing</label>
                        <TextField
                            type="number"
                            value={form.price}
                            placeholder='pricing'
                            onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                        ></TextField>
                        <label htmlFor="">duration</label>
                        <TextField
                            type="text"
                            value={form.duration}
                            placeholder="duration"
                            onChange={(e) => setForm({ ...form, duration: Number(e.target.value) })}
                        />
                        <label htmlFor="">Service description</label>
                        <TextField
                            type="text"
                            value={form.description}
                            placeholder="Service Description"
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                        />
                        <Button  type="submit">submit inquiry</Button>
                    </form>
                </Box>
                <Footer />
            </Container>
        )
    }
    export default createProposal;

