import React, { useState, useEffect } from "react";
import { Header } from "./Dashboard/Header";
import { Balance } from "./Dashboard/Balance";
import { IncomeExpenses } from "./Dashboard/IncomeExpenses";
import { History } from "./Dashboard/History";
import { AddTransactionForm } from "./Dashboard/AddTransaction";
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { UserInfo } from "./Dashboard/UserInfo";
import { useAuth } from "../context/AuthProvider";
import { Navigate } from "react-router-dom";
import { db } from "../firebase-config"; // Import Firestore instance
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  where,
  updateDoc,
  doc,
} from "firebase/firestore";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");

  // Add user prompt to Firestore
  const sendMessageToGeminiAPI = async (prompt) => {
    const queryDoc = await addDoc(collection(db, "generate"), {
      prompt,
      state: "PENDING",
    });
    listenForGeminiResponse(queryDoc.id);
  };

  // Listen for Gemini API response
  const listenForGeminiResponse = (docId) => {
    const queryRef = doc(db, "generate", docId);
    const unsubscribe = onSnapshot(queryRef, (doc) => {
      const data = doc.data();
      if (
        data &&
        data.status &&
        data.status.state === "COMPLETED" &&
        data.response
      ) {
        setMessages((prev) => [
          ...prev,
          { sender: "Bot", text: data.response },
        ]);
        unsubscribe(); // Stop listening after receiving the response
      }
    });
  };

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const handleSendMessage = () => {
    if (!userInput.trim()) return;

    // Add user's message to the chat
    setMessages((prev) => [...prev, { sender: "User", text: userInput }]);

    // Send the prompt to the Gemini API by adding a document in Firestore
    sendMessageToGeminiAPI(userInput);

    setUserInput("");
  };

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        right: 0,
        width: "300px",
        maxHeight: "400px",
        display: "flex",
        flexDirection: "column",
        padding: 2,
      }}
      elevation={3}
    >
      <Typography variant="h6" gutterBottom>
        Chatbot
      </Typography>
      <List sx={{ overflowY: "auto", flexGrow: 1 }}>
        {messages.map((msg, index) => (
          <ListItem key={index} disableGutters>
            <ListItemText primary={`${msg.sender}: ${msg.text}`} />
          </ListItem>
        ))}
      </List>
      <Box sx={{ display: "flex", mt: 2 }}>
        <TextField
          variant="outlined"
          size="small"
          placeholder="Type a message..."
          value={userInput}
          onChange={handleUserInput}
          sx={{ flexGrow: 1 }}
        />
        <Button variant="contained" onClick={handleSendMessage} sx={{ ml: 1 }}>
          Send
        </Button>
      </Box>
    </Paper>
  );
};

export const Dashboard = () => {
  const { currentUser } = useAuth();

  return currentUser ? (
    <Box
      className="dashboard"
      sx={{
        width: "clamp(300px, 70%, 800px)",
        height: "100vh",
      }}
    >
      <UserInfo />
      <Header />
      <Balance />
      <IncomeExpenses />
      <AddTransactionForm />
      <History />
      <Chatbot />
    </Box>
  ) : (
    <Navigate to="/login" />
  );
};
