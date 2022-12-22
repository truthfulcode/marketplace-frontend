import React from 'react'
import {Typography, Box, Grid, TextField, styled} from '@mui/material'
import {Card,CardActions,CardContent,CardMedia} from '@mui/material'
import Button from '@mui/material/Button';
import {FunctionComponent, PropsWithChildren} from 'react'
import  { FC } from 'react'


interface BioProps {
    service: string,
    description: string,
  }
const Listcard: FC<BioProps> = (props): JSX.Element => {
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    //navigate to view page
   //navigator('/second'); 
  }; 
    return(
        <>       
        <Card sx={{ maxWidth: 350 }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image="/img/luke-peters-B6JINerWMz0-unsplash.jpg"
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {props.service}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    {props.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button onClick={handleClick}  size="small">View</Button>
                    
                  </CardActions>
                </Card>
        </>
    )


}
export default Listcard