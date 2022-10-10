import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { Box } from "@mui/system";

import { useAuth } from "./context/AuthProvider";

export const SignupForm = () => {
  const { handleSubmit, control, reset, setFocus } = useForm();
  const { signupUser, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmitSignupForm(data) {
    if (data.confirmPassword !== data.password) {
      setError("Passwords do not match");
      return;
    }

    try {
      setError("");
      setLoading(true);
      await signupUser(data.email, data.password);
      reset();
    } catch (error) {
      setError(error.message);
    }

    setLoading(false);
    console.log(currentUser);
  }

  return (
    <Box
      className="container"
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box className="signupForm">
        <Paper
          elevation={12}
          sx={{
            p: 4,
          }}
        >
          <Typography
            variant="h3"
            sx={{
              marginBottom: "24px",
            }}
          >
            Sign Up
          </Typography>
          {error && (
            <Alert severity="error" sx={{ marginBottom: "24px" }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit((data) => handleSubmitSignupForm(data))}>
            <Grid container gap={4}>
              <Grid item xs={12}>
                <Controller
                  render={({ field: { ref, ...field } }) => {
                    return (
                      <TextField
                        {...field}
                        inputRef={ref}
                        label={"Email"}
                        placeholder={"Enter email..."}
                        sx={{ width: "100%" }}
                        type="email"
                      />
                    );
                  }}
                  rules={{ required: true }}
                  name="email"
                  control={control}
                  defaultValue=""
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  render={({ field: { ref, ...field } }) => {
                    return (
                      <TextField
                        {...field}
                        inputRef={ref}
                        label={"Password"}
                        placeholder={"Enter password..."}
                        sx={{ width: "100%" }}
                        type="password"
                      />
                    );
                  }}
                  rules={{ required: true }}
                  name="password"
                  control={control}
                  defaultValue=""
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  render={({ field: { ref, ...field } }) => {
                    return (
                      <TextField
                        {...field}
                        inputRef={ref}
                        label={"Confirm Password"}
                        placeholder={"Enter password again..."}
                        sx={{ width: "100%" }}
                        type="password"
                      />
                    );
                  }}
                  rules={{ required: true }}
                  name="confirmPassword"
                  control={control}
                  defaultValue=""
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" disabled={loading}>
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
    </Box>
  );
};
