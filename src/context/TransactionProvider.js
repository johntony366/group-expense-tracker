import { createContext, useContext, useReducer } from "react";

import React from "react";

const TransactionsContext = createContext(null);
const initialState = [];

export const TransactionProvider = ({ children }) => {
  const [transactionsState, transactionsDispatch] = useReducer(
    transactionsReducer,
    initialState
  );

  return (
    <TransactionsContext.Provider
      value={{
        transactionsState: transactionsState,
        transactionsDispatch: transactionsDispatch,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};

export function useTransactionsState() {
  return useContext(TransactionsContext).transactionsState;
}

export function useTransactionsDispatch() {
  return useContext(TransactionsContext).transactionsDispatch;
}

function transactionsReducer(oldTransactions, action) {
  switch (action.type) {
    case "got_transactions":
      return [...action.transactions];

    default:
      throw Error("Unknown action: " + action.type);
  }
}
