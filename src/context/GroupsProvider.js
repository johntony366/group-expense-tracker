import React, { createContext, useContext, useReducer } from "react";

const GroupsContext = createContext(null);
const initialState = [];

export const GroupsProvider = ({ children }) => {
  const [groupsState, groupsDispatch] = useReducer(groupsReducer, initialState);

  return (
    <GroupsContext.Provider value={{ groupsState, groupsDispatch }}>
      {children}
    </GroupsContext.Provider>
  );
};

export function useGroupsState() {
  return useContext(GroupsContext).groupsState;
}

export function useGroupsDispatch() {
  return useContext(GroupsContext).groupsDispatch;
}

function groupsReducer(oldGroups, action) {
  switch (action.type) {
    case "got_groups":
      return [...action.groups];
    default:
      throw Error("Unknown action: " + action.type);
  }
}
