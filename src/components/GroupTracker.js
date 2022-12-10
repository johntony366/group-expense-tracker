import { Box } from "@mui/system";
import { useAuth } from "../context/AuthProvider";
import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { GroupHistory } from "./GroupTracker/GroupHistory";
import { AddMember } from "./GroupTracker/AddMember";
import { GroupHeader } from "./GroupTracker/GroupHeader";
import { MakePaymentForm } from "./GroupTracker/MakePaymentForm";
import { GroupUserInfo } from "./GroupTracker/GroupUserInfo";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase-config";

export default function GroupTracker() {
  const { currentUser, currentUsername } = useAuth();
  const params = useParams();
  const selectedGroup = params.selectedGroup;
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    async function getIsOwner() {
      const docRef = doc(db, `/groups/${selectedGroup}`);
      const result = await getDoc(docRef);
      const data = result.data();
      setIsOwner(currentUsername === data.owner);
    }
    getIsOwner();
  }, [currentUsername, selectedGroup]);

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
      {isOwner && <AddMember selectedGroup={selectedGroup} />}
      <MakePaymentForm selectedGroup={selectedGroup} />
      <GroupHistory selectedGroup={selectedGroup} />
    </Box>
  ) : (
    <Navigate to="/login" />
  );
}
