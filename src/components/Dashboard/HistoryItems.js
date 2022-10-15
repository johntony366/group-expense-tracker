import React from "react";
import { useEffect } from "react";
import { List } from "@mui/material";
import { onSnapshot, collection, query, orderBy } from "firebase/firestore";

import { HistoryItem } from "./HistoryItem";
import { useDispatch, useTransactions } from "context/TransactionProvider";
import { db } from "firebase-config";
import { useAuth } from "context/AuthProvider";

export const HistoryItems = () => {
  const transactions = useTransactions();
  const dispatch = useDispatch();
  const { currentUser } = useAuth();

  useEffect(() => {
    const unsub = onSnapshot(
      query(collection(db, `users/${currentUser.uid}/transactions`), orderBy('timestamp', "desc")),
      (querySnapshot) => {
        const transactions = querySnapshot.docs.map((doc) => doc.data());
        dispatch({type: "got_transactions", transactions: transactions})
      }
    );

    return unsub;
  }, [dispatch, currentUser.uid]);

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
