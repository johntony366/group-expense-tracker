import React from "react";
import { Box, Link, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { auth, db } from "../../firebase-config";
import { useAuth } from "../../context/AuthProvider";
import { signOut } from "firebase/auth";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";

export const GroupUserInfo = ({ selectedGroup }) => {
  const { currentUser, currentUsername } = useAuth();

  async function handleLogout() {
    await signOut(auth);
  }

  async function handleLeaveGroup() {
    removeUserFromGroup();
    removeGroupFromUser();
  }

  async function removeUserFromGroup() {
    const docRef = doc(db, `/groups/${selectedGroup}`);
    const result = await getDoc(docRef);
    const data = result.data();
    let members = data.members;
    if (members.length === 1) {
      deleteDoc(docRef);
    } else {
      members = members.filter((member) => member !== currentUsername);
      if (data.owner === currentUsername)
        updateDoc(docRef, { members: members, owner: members[0] });
      else updateDoc(docRef, { members: members });
    }
  }

  async function removeGroupFromUser() {
    // debugger;
    const docRef = doc(db, `/users/${currentUsername}`);
    const result = await getDoc(docRef);
    const data = result.data();
    let groups = data.groups;
    groups = groups.filter((group) => group !== selectedGroup);
    updateDoc(docRef, { groups: groups });
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "end",
        marginBottom: "32px",
        marginTop: "12px",
      }}
    >
      <Typography>{currentUser.email}</Typography>
      <Stack direction={"row"} spacing={1} fontSize="18px">
        <Link component={RouterLink} to="/groups">
          Groups
        </Link>
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
