import React from "react";

import { Header } from "./Header";
import { Balance } from "./Balance";
import { IncomeExpenses } from "./IncomeExpenses";
import { History } from "./History";
import { AddTransactionForm } from "./AddTransaction";
import { Box } from "@mui/system";

export const Dashboard = () => {
  return (
    <Box>
      <Header />
      <Balance />
      <IncomeExpenses />
      <AddTransactionForm />
      <History />
    </Box>
  );
};
