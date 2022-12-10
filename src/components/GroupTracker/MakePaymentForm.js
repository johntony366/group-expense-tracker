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
  }, [currentUsername, selectedGroup]);

  async function handleAddPayment({ recipient, itemName, amount }) {
    const roundedAmount = Math.round(amount * 100 + Number.EPSILON) / 100;
    const id = await addTransactionToUsers(recipient, itemName, roundedAmount);
    addTransactionToGroup(recipient, itemName, roundedAmount, id);

    setFocus("recipient");
    reset();
  }

  async function addTransactionToUsers(recipient, itemName, amount) {
    const fromRef = doc(
      collection(db, `users/${currentUsername}/transactions`)
    );

    await setDoc(fromRef, {
      itemName: itemName,
      amount: -amount,
      id: fromRef.id,
      timestamp: serverTimestamp(),
    });

    const toRef = doc(collection(db, `users/${recipient}/transactions`));

    await setDoc(toRef, {
      itemName: itemName,
      amount: amount,
      id: fromRef.id,
      timestamp: serverTimestamp(),
    });

    return fromRef.id;
  }

  async function addTransactionToGroup(recipient, itemName, amount, id) {
    const transactionRef = doc(
      collection(db, `groups/${selectedGroup}/transactions`)
    );

    await setDoc(transactionRef, {
      from: currentUsername,
      to: recipient,
      id: id,
      itemName: itemName,
      amount: amount,
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
                <Select {...field} defaultValue="" required>
                  {recipients.map((recipient, i) => (
                    <MenuItem value={recipient} key={i}>
                      {recipient}
                    </MenuItem>
                  ))}
                </Select>
              )}
              name="recipient"
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
                  required
                  InputLabelProps={{ required: false }}
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
                    label={"Item"}
                    placeholder={"Enter item..."}
                    sx={{ width: "100%" }}
                    required
                    InputLabelProps={{ required: false }}
                  />
                );
              }}
              rules={{ required: true }}
              name="itemName"
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
