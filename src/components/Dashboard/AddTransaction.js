import React from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Box, Typography, Button } from "@mui/material";

import { setDoc, collection, serverTimestamp, doc } from "firebase/firestore";
import { useAuth } from "../../context/AuthProvider";
import { db } from "../../firebase-config";

export const AddTransactionForm = () => {
  const { handleSubmit, control, reset, setFocus } = useForm();
  const { currentUsername } = useAuth();

  async function handleAddTransaction(data) {
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
      className="addTransaction"
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
        Add new transaction
      </Typography>
      <form
        onSubmit={handleSubmit((data) => handleAddTransaction(data))}
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
                    label={"Item"}
                    placeholder={"Enter item..."}
                    sx={{ width: "100%" }}
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
