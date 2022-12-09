import { createContext, useContext, useReducer } from "react";

import React from "react";

const GroupTransactionsContext = createContext(null);
const initialState = [];

export const GroupTransactionProvider = ({ children }) => {
  const [groupTransactionsState, groupTransactionsDispatch] = useReducer(
    groupTransactionsReducer,
    initialState
  );

  return (
    <GroupTransactionsContext.Provider
      value={{
        groupTransactionsState: groupTransactionsState,
        groupTransactionsDispatch: groupTransactionsDispatch,
      }}
    >
      {children}
    </GroupTransactionsContext.Provider>
  );
};

export function useGroupTransactionsState() {
  return useContext(GroupTransactionsContext).groupTransactionsState;
}

export function useGroupTransactionsDispatch() {
  return useContext(GroupTransactionsContext).groupTransactionsDispatch;
}

function groupTransactionsReducer(oldTransactions, action) {
  switch (action.type) {
    case "got_transactions":
      return [...action.transactions];

    default:
      throw Error("Unknown action: " + action.type);
  }
}
