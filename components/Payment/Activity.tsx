import React from 'react'
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { transaction } from '../../utils/types';
import { styles } from '../StyledComponents';
const Activity = () => {
  let transactions: transaction[] = [
    { txId: "1", txType: "deposit", status: "success", amount: 1 },
    { txId: "2", txType: "withdraw", status: "success", amount: 1 },
  ];
  return (
    <div>
      <Box sx={{ flexDirection: "column", ...styles.center }}>
            <TableContainer sx={{ maxWidth: 1280 }} component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Transaction Id</TableCell>
                    <TableCell align="center">Transaction Type</TableCell>
                    <TableCell align="center">status</TableCell>
                    <TableCell align="center">amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transactions.map((tx) => (
                    <TableRow
                      key={tx.txId}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {tx.txId}
                      </TableCell>
                      <TableCell align="center">{tx.txType}</TableCell>
                      <TableCell align="center">{tx.status}</TableCell>
                      <TableCell align="center">{tx.amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
    </div>
  )
}

export default Activity