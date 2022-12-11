import React, { useState } from "react";
import {
  Box,
  Typography,
  ListItem,
  ListItemText,
  IconButton,
  Collapse,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";

import { useAuth } from "../../context/AuthProvider";
import { collection, deleteDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase-config";

export const HistoryItem = ({ itemName, amount, id }) => {
  const { currentUsername } = useAuth();
  const [error, setError] = useState("");

  async function deleteTransactionFromFirestore(id) {
    const colRef = collection(db, `users/${currentUsername}/transactions`);
    const querySnapshot = await getDocs(colRef);
    querySnapshot.forEach(async (doc) => {
      const data = doc.data();
      if (data.id === id) {
        if (data.from !== undefined) {
          setError("Group transactions must be deleted from respective groups");
        } else {
          setError("");
          deleteDoc(doc.ref);
        }
      }
    });
  }

  function handleDelete() {
    // FirebaseStorage.deleteTransaction(dispatch, id);
    deleteTransactionFromFirestore(id);
  }

  return (
    <>
      {error && (
        <Collapse in={error ? true : false}>
          <Alert
            severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setError("");
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ my: 2 }}
          >
            {error}
          </Alert>
        </Collapse>
      )}
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
    </>
  );
};
