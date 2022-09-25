import React from "react";
import { Box, Typography } from "@mui/material";

import { HistoryItems } from "./HistoryItems";

export const History = () => {
  return (
    <Box
      sx={{
        width: "100%",
        my: "24px",
      }}
    >
      <Typography variant="h5">History</Typography>
      <HistoryItems />
    </Box>
  );
};
