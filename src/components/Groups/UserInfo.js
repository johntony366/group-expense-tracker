import React from "react";
import { Box, Link, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { auth } from "firebase-config";
import { useAuth } from "context/AuthProvider";
import { signOut } from "firebase/auth";

export const UserInfo = () => {
  const { currentUser } = useAuth();

  async function handleLogout() {
    await signOut(auth);
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
        <Link component={RouterLink} to="/dashboard">
          Dashboard
        </Link>
        <Link onClick={handleLogout} component={RouterLink} to="/login">
          Logout
        </Link>
      </Stack>
    </Box>
  );
};
