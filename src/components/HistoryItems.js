import React from "react";
import { useEffect } from "react";
import { List } from "@mui/material";
import { onSnapshot, collection } from "firebase/firestore";

import { HistoryItem } from "./HistoryItem";
import { useDispatch, useTransactions } from "../context/TransactionProvider";
import { FirebaseStorage } from "../FirebaseStorage";
import { db } from "../firebase-config";

export const HistoryItems = () => {
  const transactions = useTransactions();
  const dispatch = useDispatch();

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "users/temp/transactions"),
      (querySnapshot) => {
        FirebaseStorage.getTransactions(dispatch);
        console.log("Fetched transactions");
      }
    );

    return unsub;
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
