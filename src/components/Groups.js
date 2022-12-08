import React from "react";

import { useAuth } from "context/AuthProvider";
import { Box } from "@mui/system";
import { Navigate } from "react-router-dom";
import { Typography } from "@mui/material";

export const Groups = () => {
  const { currentUser } = useAuth();

  return currentUser ? (
    <Box
      className="dashboard"
      sx={{
        width: "clamp(300px, 70%, 800px)",
      }}
    >
      <Typography variant="h3">Groups</Typography>
    </Box>
  ) : (
    <Navigate to="/login" />
  );
};
