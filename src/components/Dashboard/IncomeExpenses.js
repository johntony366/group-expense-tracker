import React from "react";
import { Box, Typography } from "@mui/material";

import { useTransactions } from "../../context/TransactionProvider"

export const IncomeExpenses = () => {
  const transactions = useTransactions();

  let income = 0, expense = 0;
  transactions.forEach(transaction => {
    const amount = Number(transaction.amount)
    if (amount >= 0) {
      income += amount;
    } else {
      expense += Math.abs(amount);
    }
  });

  
  return (
    <Box
      className="income-expenses"
      sx={{
        display: "flex",
        gap: "48px",
        p: "12px",
        backgroundColor: "common.white",
        boxShadow: "1px 4px 4px 1px #EDEDED",
        borderRadius: "16px",
      }}
    >
      <Box className="income">
        <Typography variant="h5">Income</Typography>
        <Typography variant="h5" color="success.light">
          ₹{income}
        </Typography>
      </Box>
      <Box className="expenses">
        <Typography variant="h5">Expense</Typography>
        <Typography variant="h5" color="error.light">
          ₹{expense}
        </Typography>
      </Box>
    </Box>
  );
};
