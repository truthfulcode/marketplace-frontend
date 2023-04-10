import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { transaction } from "../../utils/types";
import { styles } from "../StyledComponents";
import { Transaction } from "@prisma/client";
import Link from "next/link";
const Activity = ({ txs }) => {
  const [transactions, setTransactions] = useState<Array<Transaction>>([])
  useEffect(()=>{
    if(txs){
      setTransactions(JSON.parse(txs))
    }
  },[txs])
  return (
    <div>
      <Box sx={{ flexDirection: "column", ...styles.center }}>
        <TableContainer sx={{ maxWidth: 1280 }} component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Transaction Id</TableCell>
                <TableCell align="center">Transaction Type</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Amount</TableCell>
                <TableCell align="center">Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((tx) => (
                <TableRow
                  key={tx.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Typography component={'span'}>
                      <Link
                        href={"https://goerli.etherscan.io/tx/" + tx.txHash}
                        target="_blank"
                      >
                        {(
                          tx.txHash.substring(0, 10) +
                          "...." +
                          tx.txHash.substring(54, 64)
                        ).toUpperCase()}
                      </Link>
                    </Typography>
                  </TableCell>
                  <TableCell sx={{color:tx.txType==="DEPOSIT" ? "green" : "red"}} align="center">{tx.txType}</TableCell>
                  <TableCell align="center">{tx.status}</TableCell>
                  <TableCell align="center">{tx.amount/1e6}</TableCell>
                  <TableCell align="center">{(tx.timestamp as Date)?.toString().substring(0,10)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
            {transactions.length === 0 && <Typography component={'span'} variant="body1" sx={{...styles.center,width:"100%",mt:4}}>No Records</Typography>}
        </TableContainer>
      </Box>
    </div>
  );
};

export default Activity;
