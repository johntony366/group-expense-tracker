import React from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Box, Typography, Divider } from "@mui/material";

export const AddTransactionForm = () => {
  const defaultValues = {
    TextField: "",
  };

  const { handleSubmit, reset, setValue, control } = useForm({ defaultValues });

  return (
    
    <Box className="addTransaction">
      <Typography variant="h5">Add new transaction</Typography>
      <Divider />
      <form
        onSubmit={handleSubmit((data) => console.log(data))}
        style={{ width: "100%", marginTop: "12px" }}
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
