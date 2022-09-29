import { createContext, useContext, useReducer } from "react";

import React from "react";

const TransactionsContext = createContext(null);
const TransactionsDispatchContext = createContext(null);

export const TransactionProvider = ({ children }) => {
  const [transactions, dispatch] = useReducer(transactionsReducer, []);

  return (
    <TransactionsContext.Provider value={transactions}>
      <TransactionsDispatchContext.Provider value={dispatch}>
        {children}
      </TransactionsDispatchContext.Provider>
    </TransactionsContext.Provider>
  );
};

export function useTransactions() {
  return useContext(TransactionsContext);
}

export function useDispatch() {
  return useContext(TransactionsDispatchContext);
}

function transactionsReducer(oldTransactions, action) {
  switch (action.type) {
    case "got_transactions":
      return [...action.transactions];

    case "added_transaction":
      return [
        {
          itemName: action.itemName,
          amount: action.amount,
          id: action.id,
        },
        ...oldTransactions,
      ];

    case "deleted_transaction":
      return oldTransactions.filter(
        (oldTransaction) => oldTransaction.id !== action.targetId
      );

    default:
      throw Error("Unknown action: " + action.type);
  }
}
