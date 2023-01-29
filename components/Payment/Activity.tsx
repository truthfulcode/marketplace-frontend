import React, { useEffect } from "react";
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
  let transactions: Transaction[] = JSON.parse(txs);
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
                  key={tx.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Typography>
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
  );
};

export default Activity;
