import React from "react";
import { useEffect } from "react";
import { List } from "@mui/material";
import { onSnapshot, collection, query, orderBy } from "firebase/firestore";

import { GroupHistoryItem } from "./GroupHistoryItem";
import {
  useGroupTransactionsDispatch,
  useGroupTransactionsState,
} from "../../context/GroupTransactionProvider";
import { db } from "../../firebase-config";
import { useAuth } from "../../context/AuthProvider";

export const GroupHistoryItems = ({ selectedGroup }) => {
  const transactions = useGroupTransactionsState();
  const dispatch = useGroupTransactionsDispatch();
  const { currentUsername } = useAuth();

  useEffect(() => {
    const unsub = onSnapshot(
      query(
        collection(db, `groups/${selectedGroup}/transactions`),
        orderBy("timestamp", "desc")
      ),
      (querySnapshot) => {
        const transactions =
          querySnapshot && querySnapshot.docs.map((doc) => doc.data());
        dispatch({ type: "got_transactions", transactions: transactions });
      }
    );

    return unsub;
  }, [currentUsername, dispatch, selectedGroup]);

  return (
    <List
      sx={{ display: "flex", flexDirection: "column", alignItems: "center  " }}
    >
      {transactions.map((transaction, i) => {
        return (
          <GroupHistoryItem
            itemName={transaction.itemName}
            amount={transaction.amount}
            id={transaction.id}
            key={i}
            selectedGroup={selectedGroup}
            from={transaction.from}
            to={transaction.to}
          />
        );
      })}
    </List>
  );
};
