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
  buttonContainer: {
    marginTop: "20px"
  }
});

const OrderViewCustomer = () => {
  const classes = useStyles();
  const [selectedFilter, setSelectedFilter] = useState("all");

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFilter(event.target.value);
  }

  return (
    <Box className={classes.header}>
      <Navbar signUp={false} signIn={false} />
      <FormWrapper>
        <Typography variant="h5" gutterBottom>
          View your orders by
        </Typography>
        <Grid container spacing={2} className={classes.buttonContainer}>
          <Grid item xs={3}>
            <TextField
              fullWidth
              select
              label="Filter"
              value={selectedFilter}
              onChange={handleFilterChange}
            >
              <option value="all">All Orders</option>
              <option value="date">Date orders</option>
              <option value="active">Active orders</option>
              <option value="completed">Completed orders</option>
              <option value="cancelled">Cancelled orders</option>
            </TextField>
          </Grid>
        </Grid>
      </FormWrapper>
    </Box>
  )
}

export default OrderViewCustomer
