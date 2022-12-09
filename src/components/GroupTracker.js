import { Box } from "@mui/system";
import { useAuth } from "context/AuthProvider";
import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { History } from "./Dashboard/History";
import { UserInfo } from "./Dashboard/UserInfo";
import { GroupHeader } from "./Groups/GroupHeader";
import { MakePaymentForm } from "./Groups/MakePaymentForm";

export default function GroupTracker() {
  const { currentUser } = useAuth();
  const params = useParams();
  const selectedGroup = params.selectedGroup;

  return currentUser ? (
    <Box
      className="dashboard"
      sx={{
        width: "clamp(300px, 70%, 800px)",
      }}
    >
      <UserInfo />
      <GroupHeader selectedGroup={selectedGroup} />
      {/* <Balance /> */}
      {/* <IncomeExpenses /> */}
      <MakePaymentForm />
      <History />
    </Box>
  ) : (
    <Navigate to="/login" />
  );
}
