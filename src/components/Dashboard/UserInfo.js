import React from 'react'
import { Box, Link, Typography } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"
import { auth } from "firebase-config"
import { useAuth } from 'context/AuthProvider'
import { signOut } from 'firebase/auth'

export const UserInfo = () => {
  const { currentUser } = useAuth();

  async function handleLogout() {
    signOut(auth);
  }
  
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "end",
        marginBottom: "12px",
      }}
    >
      <Typography>{currentUser.email}</Typography>
      <Link component={RouterLink} to="/login">
        Logout
      </Link>
    </Box>
  );
}
