import React from "react";
import { Box, Typography } from "@mui/material";

export const IncomeExpenses = () => {
  return (
    <Box
      className="income-expenses"
      sx={{
        display: "flex",
        gap: "48px",
        p: "12px",
        backgroundColor: "common.white",
        boxShadow: "0px 3px 5px 0px #BCBCBC",
      }}
    >
      <Box className="income">
        <Typography variant="h5">Income</Typography>
        <Typography variant="h5" color="success.light">
          $500.00
        </Typography>
      </Box>
      <Box className="expenses">
        <Typography variant="h5">Expense</Typography>
        <Typography variant="h5" color="error.light">
          $240.00
        </Typography>
      </Box>
    </Box>
  );
};
