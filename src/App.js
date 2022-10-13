import { Box } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { TransactionProvider } from "./context/TransactionProvider";
import { AuthProvider } from "./context/AuthProvider";

import { appTheme } from "./theme";
import "./App.css";
import { useEffect } from "react";
import { Signup } from "./components/Auth/Signup";
import { Dashboard } from "./components/Dashboard";
import { Login } from "components/Auth/Login";

function App() {
  useEffect(() => {});

  return (
    <ThemeProvider theme={appTheme}>
      <Box
        className="App"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "clamp(300px, 50%, 800px)",
        }}
      >
        <BrowserRouter>
          <TransactionProvider>
            <AuthProvider>
              <Routes>
                <Route path="/signup" element={<Signup />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </AuthProvider>
          </TransactionProvider>
        </BrowserRouter>
      </Box>
    </ThemeProvider>
  );
}

export default App;
