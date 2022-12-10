import { Box } from "@mui/system";
import { useAuth } from "context/AuthProvider";
import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { UserInfo } from "./Dashboard/UserInfo";
import { GroupHistory } from "./Groups/GroupHistory";
import { AddMember } from "./Groups/AddMember";
import { GroupHeader } from "./Groups/GroupHeader";
import { MakePaymentForm } from "./Groups/MakePaymentForm";
import { GroupUserInfo } from "./Groups/GroupUserInfo";

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
      <GroupUserInfo />
      <GroupHeader selectedGroup={selectedGroup} />
      <AddMember selectedGroup={selectedGroup} />
      <MakePaymentForm selectedGroup={selectedGroup} />
      <GroupHistory selectedGroup={selectedGroup} />
    </Box>
  ) : (
    <Navigate to="/login" />
  );
}
