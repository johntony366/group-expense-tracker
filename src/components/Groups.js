import React, { useEffect } from "react";

import { useAuth } from "context/AuthProvider";
import { Box } from "@mui/system";
import { Navigate, useNavigate } from "react-router-dom";
import { Link, Button, Stack, Typography } from "@mui/material";
import { useGroupsDispatch, useGroupsState } from "context/GroupsProvider";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "firebase-config";
import Group from "./Groups/Group";

export const Groups = () => {
  const { currentUser } = useAuth();
  const groups = useGroupsState();
  const dispatch = useGroupsDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, `users/${currentUser.uid}`),
      (querySnapshot) => {
        const groups = querySnapshot.data();
        dispatch({ type: "got_groups", groups: groups.groups });
      }
    );

    return unsub;
  }, []);

  return currentUser ? (
    <Box
      className="dashboard"
      sx={{
        width: "clamp(300px, 70%, 800px)",
      }}
    >
      <Typography variant="h3">Groups</Typography>
      <Stack>
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
