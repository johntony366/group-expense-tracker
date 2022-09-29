import React from "react";
import { useEffect } from "react"
import { List } from "@mui/material";

import { HistoryItem } from "./HistoryItem";
import { useDispatch, useTransactions } from "../context/TransactionProvider";
import { FirebaseStorage } from "../FirebaseStorage";

export const HistoryItems = () => {
  const transactions = useTransactions();
  const dispatch = useDispatch();

  useEffect(() => {
    FirebaseStorage.getTransactions(dispatch);
    console.log("Fetched transactions")
  }, [dispatch]);

  return (
    <List
      sx={{ display: "flex", flexDirection: "column", alignItems: "center  " }}
    >
      {transactions.map((transaction, i) => {
        return (
          <HistoryItem
            itemName={transaction.itemName}
            amount={transaction.amount}
            id={transaction.id}
            key={i}
          />
        );
      })}
    </List>
  );
};
