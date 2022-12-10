import React from "react";
import { Box, Typography } from "@mui/material";

import { GroupHistoryItems } from "./GroupHistoryItems";

export const GroupHistory = ({ selectedGroup }) => {
  return (
    <Box
      sx={{
        width: "100%",
        my: "24px",
      }}
    >
      <Typography variant="h5">History</Typography>
      <GroupHistoryItems selectedGroup={selectedGroup} />
    </Box>
  );
};
