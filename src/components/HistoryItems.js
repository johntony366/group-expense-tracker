import React from "react";
import { List, Box } from "@mui/material";

import { HistoryItem } from "./HistoryItem";

export const HistoryItems = () => {
  return (
    <List sx={{display: "flex", flexDirection: "column", alignItems: "center  "}}>
      <HistoryItem text={"Cash"} amount={500} />
      <HistoryItem text={"Book"} amount={-40} />
      <HistoryItem text={"Camera"} amount={-200} />
    </List>
  );
};
