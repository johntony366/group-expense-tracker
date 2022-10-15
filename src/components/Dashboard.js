import React from "react";

import { Header } from "./Dashboard/Header";
import { Balance } from "components/Dashboard/Balance";
import { IncomeExpenses } from "./Dashboard/IncomeExpenses";
import { History } from "components/Dashboard/History";
import { AddTransactionForm } from "./Dashboard/AddTransaction";
import { Box } from "@mui/system";

export const Dashboard = () => {
  return (
    <Box className="dashboard" sx={{
      width: "100%"
    }}>
      <Header />
      <Balance />
      <IncomeExpenses />
      <AddTransactionForm />
      <History />
    </Box>
  );
};
