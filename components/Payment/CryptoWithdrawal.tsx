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
  ListItemText,
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
      <Typography variant="h5">USDC Balance : 0</Typography>
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
        <FormControl>
          <TextField label="ADDRESS" />
          <TextField label="AMOUNT" />
          <Button sx={{ ...styles.button }}>WITHDRAW</Button>
        </FormControl>
      </Box>
    </Box>
  );
};

export default CryptoWithdrawal;
