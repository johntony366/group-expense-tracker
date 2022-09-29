import React from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Box, Typography, Button } from "@mui/material";

import { useDispatch } from "../context/TransactionProvider";

import { FirebaseStorage } from "../FirebaseStorage";

export const AddTransactionForm = () => {
  const { handleSubmit, control, reset, setFocus } = useForm();
  const dispatch = useDispatch();

  function handleAddTransaction(data) {
    const roundedAmount = Math.round(data.amount * 100 + Number.EPSILON) / 100;
    FirebaseStorage.addTransaction(dispatch, data.itemName, roundedAmount);
    setFocus("itemName");
    reset();
  }

  return (
    <Box
      className="addTransaction"
      sx={{
        width: "clamp(250px, 50%, 500px)",
        marginTop: "24px",
        border: 1,
        borderColor: "grey.400",
        padding: "12px",
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
