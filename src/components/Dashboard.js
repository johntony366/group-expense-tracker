import React from "react";

import { Header } from "./Dashboard/Header";
import { Balance } from "components/Dashboard/Balance";
import { IncomeExpenses } from "./Dashboard/IncomeExpenses";
import { History } from "components/Dashboard/History";
import { AddTransactionForm } from "./Dashboard/AddTransaction";
import { Box } from "@mui/system";
import { UserInfo } from "./Dashboard/UserInfo";
import { useAuth } from "context/AuthProvider";
import { Navigate } from "react-router-dom";

export const Dashboard = () => {
  const { currentUser } = useAuth();
  return currentUser ? (
    <Box
      className="dashboard"
      sx={{
        width: "clamp(300px, 70%, 800px)",
      }}
    >
      <UserInfo />
      <Header />
      <Balance />
      <IncomeExpenses />
      <AddTransactionForm />
      <History />
    </Box>
  ) : (
    <Navigate to="/login" />
  );
};
