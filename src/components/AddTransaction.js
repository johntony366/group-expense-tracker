import React from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Box, Typography } from "@mui/material";

export const AddTransactionForm = () => {
  const defaultValues = {
    TextField: "",
  };

  const { handleSubmit, reset, setValue, control } = useForm({ defaultValues });

  return (
    <Box className="addTransaction" width="clamp(250px, 50%, 500px)">
      <Typography variant="h5" sx={{ marginBottom: "16px" }}>
        Add new transaction
      </Typography>
      <form
        onSubmit={handleSubmit((data) => console.log(data))}
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
              name="TextField"
              control={control}
            />
          </section>
          <section>
            <Controller
              render={({ field }) => (
                <TextField
                  label={"Amount"}
                  placeholder={"Enter amount..."}
                  sx={{ width: "100%" }}
                  {...field}
                />
              )}
              name="TextField"
              control={control}
            />
          </section>
        </Box>
      </form>
    </Box>
  );
};
