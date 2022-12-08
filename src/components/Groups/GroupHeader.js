import React from "react";
import { Typography } from "@mui/material";

export const GroupHeader = ({ selectedGroup }) => {
  return <Typography variant="h4">{selectedGroup}</Typography>;
};
