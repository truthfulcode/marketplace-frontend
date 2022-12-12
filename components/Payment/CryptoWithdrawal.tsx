import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  FormControlLabel,
  Icon,
  IconButton,
  Input,
  List,
  ListItem,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { styles } from "../StyledComponents";
import Image from "next/image";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const CryptoWithdrawal = () => {
  const [address, setAddress] = useState(
    "0x0000000000000000000000000000000000000000"
  );
  return (
    <Box>
      <Typography variant="h5">Balance : DAI: 0 | USDT: 0 | USDC: 0</Typography>
      <Typography>
        Supported Crypto
        <List sx={{ ...styles.center }}>
          {["DAI", "USDT", "USDC"].map((value, index) => (
            <ListItem sx={{ ...styles.center }}>
              <Image
                src={"/img/" + value + ".png"}
                width={48}
                height={48}
                alt={value}
              />
            </ListItem>
          ))}
        </List>
      </Typography>
      <Typography>Make sure to provide the right address, since transactions cannot be reverted!</Typography>
      <Box sx={{ ...styles.center }}>
        <FormControl>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            sx={{
                m:1
            }}
          >
            <FormControlLabel defaultChecked value="DAI" control={<Radio />} label="DAI" />
            <FormControlLabel value="USDT" control={<Radio />} label="USDT" />
            <FormControlLabel value="USDC" control={<Radio />} label="USDC" />
          </RadioGroup>
          <TextField label="ADDRESS" />
          <TextField label="AMOUNT" />
          <Button sx={{ ...styles.button }}>WITHDRAW</Button>
        </FormControl>
      </Box>
    </Box>
  );
};

export default CryptoWithdrawal;
