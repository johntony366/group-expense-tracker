import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Box,
  Typography,
  Button,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";

import {
  setDoc,
  collection,
  serverTimestamp,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { useAuth } from "context/AuthProvider";
import { db } from "firebase-config";

export const MakePaymentForm = ({ selectedGroup }) => {
  const { handleSubmit, control, reset, setFocus } = useForm();
  const { currentUsername } = useAuth();
  const [recipients, setRecipients] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, `groups/${selectedGroup}`),
      (querySnapshot) => {
        const data = querySnapshot.data();
        const members = data.members;
        const recipientArray = members.filter(
          (member) => member !== currentUsername
        );
        setRecipients(recipientArray);
      }
    );

    return unsub;
  }, []);

  async function handleAddPayment(data) {
    const roundedAmount = Math.round(data.amount * 100 + Number.EPSILON) / 100;
    addTransactionToFirestore(data.itemName, roundedAmount);

    setFocus("itemName");
    reset();
  }

  async function addTransactionToFirestore(itemName, amount) {
    const transactionRef = doc(
      collection(db, `users/${currentUsername}/transactions`)
    );

    await setDoc(transactionRef, {
      itemName: itemName,
      amount: amount,
      id: transactionRef.id,
      timestamp: serverTimestamp(),
    });
  }

  return (
    <Box
      className="makePayment"
      sx={{
        width: "clamp(250px, 50%, 400px)",
        border: 1,
        borderColor: "grey.400",
        padding: "12px",
        margin: "0 auto",
        marginTop: "24px",
      }}
    >
      <Typography variant="h5" sx={{ marginBottom: "16px" }}>
        Make payment
      </Typography>
      <form
        onSubmit={handleSubmit((data) => handleAddPayment(data))}
        style={{ width: "100%" }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            width: "100%",
          }}
        >
          <section>
            <InputLabel>Recipient</InputLabel>
            <Controller
              defaultValue={""}
              render={({ field }) => (
                <Select {...field} defaultValue="">
                  {recipients.map((recipient, i) => (
                    <MenuItem value={recipient} key={i}>
                      {recipient}
                    </MenuItem>
                  ))}
                </Select>
              )}
              name="Select"
              control={control}
            />
          </section>
          <section>
            <Controller
              render={({ field }) => (
                <TextField
                  type="number"
                  inputProps={{
                    step: "any",
                  }}
                  label={"Amount"}
                  placeholder={"Enter amount..."}
                  sx={{ width: "100%" }}
                  {...field}
                />
              )}
              rules={{ required: true }}
              name="amount"
              control={control}
              defaultValue=""
            />
          </section>
          <section>
            <Controller
              render={({ field: { ref, ...field } }) => {
                return (
                  <TextField
                    {...field}
                    inputRef={ref}
                    label={"Description"}
                    placeholder={"Enter description..."}
                    sx={{ width: "100%" }}
                  />
                );
              }}
              rules={{ required: true }}
              name="description"
              control={control}
              defaultValue=""
            />
          </section>
          <section>
            <Button
              variant="contained"
              type="submit"
              sx={{ backgroundColor: "primary.main" }}
            >
              Add
            </Button>
          </section>
        </Box>
      </form>
    </Box>
  );
};
