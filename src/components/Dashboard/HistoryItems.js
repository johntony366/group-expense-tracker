import React from "react";
import { useEffect } from "react";
import { List } from "@mui/material";
import { onSnapshot, collection, query, orderBy } from "firebase/firestore";

import { HistoryItem } from "./HistoryItem";
import {
  useTransactionsDispatch,
  useTransactionsState,
} from "context/TransactionProvider";
import { db } from "firebase-config";
import { useAuth } from "context/AuthProvider";

export const HistoryItems = () => {
  const transactions = useTransactionsState();
  const dispatch = useTransactionsDispatch();
  const { currentUsername } = useAuth();

  useEffect(() => {
    const unsub = onSnapshot(
      query(
        collection(db, `users/${currentUsername}/transactions`),
        orderBy("timestamp", "desc")
      ),
      (querySnapshot) => {
        const transactions =
          querySnapshot && querySnapshot.docs.map((doc) => doc.data());
        dispatch({ type: "got_transactions", transactions: transactions });
      }
    );

    return unsub;
  }, [currentUsername, dispatch]);

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
