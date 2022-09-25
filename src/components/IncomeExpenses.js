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
        <Typography variant="h4">INCOME</Typography>
        <Typography variant="h4" color="success.light">
          $500.00
        </Typography>
      </Box>
      <Box className="expenses">
        <Typography variant="h4">EXPENSE</Typography>
        <Typography variant="h4" color="error.light">
          $240.00
        </Typography>
      </Box>
    </Box>
  );
};
