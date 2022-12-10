import { Box } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { GroupsProvider } from "./context/GroupsProvider";
import { TransactionProvider } from "./context/TransactionProvider";
import { GroupTransactionProvider } from "./context/GroupTransactionProvider";
import { AuthProvider } from "./context/AuthProvider";

import { appTheme } from "./theme";
import "./App.css";
import { useEffect } from "react";
import { Signup } from "./components/Auth/Signup";
import { Dashboard } from "./components/Dashboard";
import { Groups } from "./components/Groups";
import { Login } from "./components/Auth/Login";
import GroupTracker from "./components/GroupTracker";

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
          height: "100vh",
          width: "100vw",
        }}
      >
        <BrowserRouter>
          <TransactionProvider>
            <GroupTransactionProvider>
              <GroupsProvider>
                <AuthProvider>
                  <Routes>
                    <Route path="/" element={<Navigate to="/dashboard" />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route
                      path="/groups/:selectedGroup"
                      element={<GroupTracker />}
                    />
                    <Route path="/groups" element={<Groups />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/login" element={<Login />} />
                  </Routes>
                </AuthProvider>
              </GroupsProvider>
            </GroupTransactionProvider>
          </TransactionProvider>
        </BrowserRouter>
      </Box>
    </ThemeProvider>
  );
}

export default App;
