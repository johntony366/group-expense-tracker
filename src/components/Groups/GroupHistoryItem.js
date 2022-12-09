import React from "react";
import {
  Box,
  Typography,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { useAuth } from "context/AuthProvider";
import { collection, deleteDoc, getDocs } from "firebase/firestore";
import { db } from "firebase-config";

export const GroupHistoryItem = ({
  itemName,
  amount,
  id,
  selectedGroup,
  from,
  to,
}) => {
  const { currentUsername } = useAuth();

  // async function deleteTransactionFromFirestore(id) {
  //   const colRef = collection(db, `users/${currentUsername}/transactions`);
  //   const querySnapshot = await getDocs(colRef);

  //   querySnapshot.forEach(async (doc) => {
  //     if (doc.id === id) {
  //       deleteDoc(doc.ref);
  //     }
  //   });
  // }

  function handleDelete() {
    deleteTransactionFromUsers(id);
    deleteTransactionFromGroup(id);
  }

  async function deleteTransactionFromUsers(id) {}

  async function deleteTransactionFromGroup(id) {}

  return (
    <Box
      sx={{
        display: "flex",
        gap: "8px",
        alignItems: "center",
        width: "clamp(250px, 50%, 400px)",
        "&:hover": { "& .deleteIcon": { display: "block" } },
      }}
    >
      <ListItem
        sx={{
          backgroundColor: "common.white",
          boxShadow: "1px 4px 5px 0px #EDEDED",
          my: "4px",
          border: "2px solid lightblue",
          borderRadius: "8px",
        }}
      >
        <ListItemText>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Box>
              <Typography variant="body1">{itemName}</Typography>
              <Typography variant="body2">
                {from}→{to}
              </Typography>
            </Box>
            <Typography variant="body1">₹{amount}</Typography>
          </Box>
        </ListItemText>
      </ListItem>
      <IconButton
        className="deleteIcon"
        sx={{ height: "40px", width: "40px", display: "none" }}
        onClick={handleDelete}
      >
        <DeleteIcon />
      </IconButton>
    </Box>
  );
};
