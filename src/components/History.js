import React from "react";
import { Box, Typography, Divider } from "@mui/material";

import { HistoryItems } from "./HistoryItems";

export const History = () => {
  return (
    <Box
      sx={{
        width: "100%",
        my: "24px",
      }}
    >
      <Typography variant="h4">History</Typography>
      <Divider />
      <HistoryItems />
    </Box>
  );
};
