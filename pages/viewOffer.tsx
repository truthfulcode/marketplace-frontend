import React from 'react'
import {Box, Button, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, SelectChangeEvent, TextareaAutosize, TextField} from "@mui/material";
import Navbar from '../components/Navbar';
import Image from 'next/image'
import {styles, SubmitButton, TitleText} from '../components/StyledComponents'
import FormWrapper from '../components/FormWrapper';

const ViewOffer = () => {

  return (
    <Box
      sx={{
        ...styles.header,
        ...styles.shadow,
        backgroundImage: "url(/img/white-bg.png)",
        height: "100vh",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <Box sx={{...styles.center, height:"90%"}}>
        <Box sx={{p:"8px", borderRadius:2, ...styles.center,flexDirection:"column", ...styles.subForm, border:"2px solid black", width: "25vw"}}>
          <TitleText>OFFER TITLE</TitleText>
          <FormLabel style={{fontWeight: "700", width: "100%"}}>Description:</FormLabel>
          <p style={{width: "100%"}}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Obcaecati, vitae. Blanditiis sequi voluptatum corrupti nihil eaque aspernatur velit, iusto praesentium dolor accusamus dolorem inventore mollitia. Quibusdam ea architecto minus rem animi reprehenderit ab earum quam voluptatum laboriosam sed voluptatem, dicta deserunt officiis nemo facilis culpa. Natus aliquam excepturi itaque magni iste, laboriosam dicta quia tempora? Laudantium provident suscipit similique ea minus corporis veritatis neque enim accusantium. Consequatur iusto similique ipsum nesciunt nulla nisi quaerat harum quia omnis impedit. Non minus, asperiores ab eum, est maiores quos consequatur soluta praesentium dicta illum, a explicabo voluptatibus eos doloremque atque expedita nam perferendis esse voluptatem sint ratione! A, exercitationem eius repellendus dolorem deleniti fugit, asperiores velit nulla, hic saepe molestiae eos distinctio architecto aliquid natus quasi? Dolor corrupti id aut cumque laborum. Omnis necessitatibus autem unde et impedit quo at officiis nulla obcaecati expedita consequuntur voluptatem soluta eveniet molestiae magnam, id voluptatibus odit atque asperiores tenetur modi reprehenderit animi adipisci? Ex commodi asperiores ipsum doloribus laboriosam eos, cupiditate hic, perspiciatis ipsam quidem nihil accusantium voluptatibus? Libero rem labore tenetur, ab a quis maiores atque. Voluptas nobis officiis numquam fuga nulla possimus, cum accusamus id vero tenetur et aliquam labore ratione alias eius unde!</p>
          <SubmitButton>ACCEPT OFFER</SubmitButton>
          <SubmitButton>GO BACK</SubmitButton>
        </Box>
      </Box>
    </Box>
  )
}

export default ViewOffer;