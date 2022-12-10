import React, { useEffect } from "react";

import { useAuth } from "../context/AuthProvider";
import { Box } from "@mui/system";
import { Navigate, useNavigate } from "react-router-dom";
import { Button, Stack, Typography } from "@mui/material";
import { useGroupsDispatch, useGroupsState } from "../context/GroupsProvider";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase-config";
import CreateGroup from "./Groups/CreateGroup";
import { UserInfo } from "./Groups/UserInfo";

export const Groups = () => {
  const { currentUser, currentUsername } = useAuth();
  const groups = useGroupsState();
  const dispatch = useGroupsDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, `users/${currentUsername}`),
      (querySnapshot) => {
        const data = querySnapshot.data();
        if (data) dispatch({ type: "got_groups", groups: data.groups });
      }
    );

    return unsub;
  }, [currentUsername, dispatch]);

  return currentUser ? (
    <Box
      className="dashboard"
      sx={{
        width: "clamp(300px, 70%, 500px)",
        height: "100vh",
      }}
    >
      <UserInfo />
      <Typography variant="h3" my={2}>
        Groups
      </Typography>
      <Stack spacing={2}>
        <CreateGroup />
        {groups &&
          groups.map((group, i) => {
            return (
              <Button
                key={i}
                sx={{
                  cursor: "pointer",
                  my: "12px",
                  textTransform: "unset",
                  fontSize: 20,
                }}
                onClick={() => {
                  navigate(`/groups/${group}`);
                }}
              >
                {group}
              </Button>
            );
          })}
      </Stack>
    </Box>
  ) : (
    <Navigate to="/login" />
  );
};
