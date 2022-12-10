import { Box } from "@mui/system";
import { useAuth } from "context/AuthProvider";
import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { GroupHistory } from "./GroupTracker/GroupHistory";
import { AddMember } from "./GroupTracker/AddMember";
import { GroupHeader } from "./GroupTracker/GroupHeader";
import { MakePaymentForm } from "./GroupTracker/MakePaymentForm";
import { GroupUserInfo } from "./GroupTracker/GroupUserInfo";

export default function GroupTracker() {
  const { currentUser } = useAuth();
  const params = useParams();
  const selectedGroup = params.selectedGroup;

  return currentUser ? (
    <Box
      className="dashboard"
      sx={{
        width: "clamp(300px, 70%, 800px)",
        height: "100vh",
      }}
    >
      <GroupUserInfo selectedGroup={selectedGroup} />
      <GroupHeader selectedGroup={selectedGroup} />
      <AddMember selectedGroup={selectedGroup} />
      <MakePaymentForm selectedGroup={selectedGroup} />
      <GroupHistory selectedGroup={selectedGroup} />
    </Box>
  ) : (
    <Navigate to="/login" />
  );
}
