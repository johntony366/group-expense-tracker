import React from "react";
import { Box, Link, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { auth, db } from "firebase-config";
import { useAuth } from "context/AuthProvider";
import { signOut } from "firebase/auth";
import { deleteDoc, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

export const GroupUserInfo = ({ selectedGroup }) => {
  const { currentUser } = useAuth();

  async function handleLogout() {
    await signOut(auth);
  }

  async function handleLeaveGroup() {
    const docRef = doc(db, `/groups/${selectedGroup}`);
    const result = await getDoc(docRef);
    const data = result.data();
    const members = data.members;
    if (members.length === 1) {
      deleteDoc(docRef);
    } else {
      members.filter((member) => member !== currentUser);
      if (data.owner === currentUser)
        updateDoc(docRef, { members: members, owner: members[0] });
      else updateDoc(docRef, { members: members });
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "end",
        marginBottom: "12px",
        marginTop: "12px",
      }}
    >
      <Typography>{currentUser.email}</Typography>
      <Stack direction={"row"} spacing={1}>
        <Link component={RouterLink} to="/dashboard">
          Dashboard
        </Link>
        <Link onClick={handleLeaveGroup} component={RouterLink} to="/groups">
          Leave group
        </Link>
        <Link onClick={handleLogout} component={RouterLink} to="/login">
          Logout
        </Link>
      </Stack>
    </Box>
  );
};
