import React from "react";
import { useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Box, Typography, Button } from "@mui/material";

import { TransactionsContext, TransactionsDispatchContext } from "../context/TransactionProvider"

export const AddTransactionForm = () => {

  const { handleSubmit, reset, setValue, control } = useForm();
  const transactions = useContext(TransactionsContext);
  const dispatch = useContext(TransactionsDispatchContext);

  function handleAddTransaction(data) {
    dispatch({
      type: "added_transaction",
      itemName: data.itemName,
      amount: data.amount
    })
  }

  return (
    <Box className="addTransaction" width="clamp(250px, 50%, 500px)">
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
                  label={"Item"}
                  placeholder={"Enter item..."}
                  sx={{ width: "100%" }}
                  {...field}
                />
              )}
              rules={{ required: true }}
              name="itemName"
              control={control}
              defaultValue=""
            />
          </section>
          <section>
            <Controller
              render={({ field }) => (
                <TextField
                  type="number"
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
            <Button
              variant="contained"
              type="submit"
              sx={{ backgroundColor: "primary.main" }}
            >
              Submit
            </Button>
          </section>
        </Box>
      </form>
    </Box>
  );
};
