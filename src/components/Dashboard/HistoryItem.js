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

export const HistoryItem = ({ itemName, amount, id }) => {
  const { currentUsername } = useAuth();

  async function deleteTransactionFromFirestore(id) {
    const colRef = collection(db, `users/${currentUsername}/transactions`);
    const querySnapshot = await getDocs(colRef);

    querySnapshot.forEach(async (doc) => {
      if (doc.id === id) {
        deleteDoc(doc.ref);
      }
    });
  }

  function handleDelete() {
    // FirebaseStorage.deleteTransaction(dispatch, id);
    deleteTransactionFromFirestore(id);
  }

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
          borderRight: amount > 0 ? "4px solid green" : "4px solid red",
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
            <Typography variant="body1">{itemName}</Typography>
            <Typography variant="body1">
              {amount >= 0 ? `+₹${amount}` : `-₹${Math.abs(amount)}`}
            </Typography>
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
