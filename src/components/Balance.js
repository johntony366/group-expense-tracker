import React from 'react'
import { Box, Typography } from "@mui/material"

import { useTransactions } from '../context/TransactionProvider'

export const Balance = () => {
  const transactions = useTransactions();
  const balance = transactions.reduce((sum, transaction) => sum + Number(transaction.amount), 0)
  
  return (
    <Box
      className="balance"
      sx={{
        width: "100%",
        my: "24px",
      }}
    >
      <Typography variant="h4">Your Balance:</Typography>
      <Typography variant="h3">
        {balance < 0 && "-"}₹{Math.abs(balance)}
      </Typography>
    </Box>
  );
}
