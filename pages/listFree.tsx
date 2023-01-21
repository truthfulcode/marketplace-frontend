import React, { useState } from "react";
import { Box, TextField, Grid, Typography } from "@mui/material";
import Navbar from '../components/Navbar';
import { makeStyles } from '@material-ui/core/styles';
import FormWrapper from "../components/FormWrapper";

const useStyles = makeStyles({
  header: {
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    backgroundImage: "url(/img/white-bg.png)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "100vh"
  },
  orderNumberContainer: {
    marginTop: "20px"
  }
});

const OrderListFreelancer = () => {
  const classes = useStyles();
  const [orderNumber, setOrderNumber] = useState("");

  const handleOrderNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOrderNumber(event.target.value);
}

return (
  <Box className={classes.header}>
    <Navbar signUp={false} signIn={false} />
    <FormWrapper>
      <Typography variant="h5" gutterBottom>
        Check client orders
      </Typography>
      <Grid container spacing={2} className={classes.orderNumberContainer}>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Order Number"
            value={orderNumber}
            onChange={handleOrderNumberChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Client Email"
            value={orderNumber}
            onChange={handleOrderNumberChange}
          />
        </Grid>
      </Grid>
      <Box mt={2}>
        <TextField
          fullWidth
          variant="outlined"
          color="primary"
          type="submit"
          value="View Order"
          onClick={() => alert(`Order number ${orderNumber}`)}
        />
      </Box>
    </FormWrapper>
  </Box>
)
}

export default OrderListFreelancer
