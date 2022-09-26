import { createContext, useContext, useReducer } from "react";

import React from "react";

const TransactionsContext = createContext(null);
const TransactionsDispatchContext = createContext(null);

export const TransactionProvider = ({ children }) => {
  const [transactions, dispatch] = useReducer(
    transactionsReducer,
    initialTransactions
  );

  return (
    <TransactionsContext.Provider value={transactions}>
      <TransactionsDispatchContext.Provider value={dispatch}>
        {children}
      </TransactionsDispatchContext.Provider>
    </TransactionsContext.Provider>
  );
};

const initialTransactions = [
  { itemName: "Cash", amount: 500 },
  { itemName: "Book", amount: -40 },
  { itemName: "Car", amount: -5000 },
];

export function useTransactions() {
  return useContext(TransactionsContext);
}

export function useDispatch() {
  return useContext(TransactionsDispatchContext);
}

function transactionsReducer(oldTransactions, action) {
  switch (action.type) {
    case "added_transaction":
      return [
        { itemName: action.itemName, amount: action.amount },
        ...oldTransactions,
      ];

    default:
      throw Error("Unknown action: " + action.type);
  }
}
