import { createContext, useContext, useReducer } from "react";

import React from "react";
import { v4 as uuidv4 } from "uuid";

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
  { itemName: "Cash", amount: 500, uuid: uuidv4() },
  { itemName: "Book", amount: -40, uuid: uuidv4() },
  { itemName: "Car", amount: -5000, uuid: uuidv4() },
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
        { itemName: action.itemName, amount: action.amount, uuid: uuidv4() },
        ...oldTransactions,
      ];

    default:
      throw Error("Unknown action: " + action.type);
  }
}
