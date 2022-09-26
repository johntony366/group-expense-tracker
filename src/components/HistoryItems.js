import React from "react";
import { List, Box } from "@mui/material";

import { HistoryItem } from "./HistoryItem";
import { useTransactions } from "../context/TransactionProvider";

export const HistoryItems = () => {
  const transactions = useTransactions();
  
  return (
    <List sx={{ display: "flex", flexDirection: "column", alignItems: "center  " }}>
      {transactions.map((transaction, i) => {
        return <HistoryItem itemName={transaction.itemName} amount={transaction.amount} uuid={transaction.uuid} key={i} />;
      })}
    </List>
  );
};
