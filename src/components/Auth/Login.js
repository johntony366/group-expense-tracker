import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";

import { Link as RouterLink, useNavigate } from "react-router-dom";

import { useAuth } from "context/AuthProvider";
import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  Alert,
  Link,
} from "@mui/material";

export const Login = () => {
  const { handleSubmit, control, reset } = useForm();
  const { loginUser, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmitLoginForm(data) {
    try {
      setError("");
      setLoading(true);
      await loginUser(data.email, data.password);
      reset();
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    }

    setLoading(false);
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
      <Box className="loginForm">
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
            Login
          </Typography>
          {error && (
            <Alert severity="error" sx={{ marginBottom: "24px" }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit((data) => handleSubmitLoginForm(data))}>
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
                <Button type="submit" variant="contained" disabled={loading}>
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>

        <Typography sx={{ marginTop: 4 }}>
          Don't have an account?{" "}
          <Link component={RouterLink} to="/signup">
            Signup
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};
