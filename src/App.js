import { Box } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// import { Header } from "./components/Header";
// import { Balance } from "./components/Balance";
// import { IncomeExpenses } from "./components/IncomeExpenses";
// import { History } from "./components/History";
// import { AddTransactionForm } from "./components/AddTransaction";

import { TransactionProvider } from "./context/TransactionProvider";
import { AuthProvider } from "./context/AuthProvider";

import { appTheme } from "./theme";
import "./App.css";
import { useEffect } from "react";
import { SignupForm } from "./Signup";

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
                <Route path="/signup" element={<SignupForm/>}/>
              </Routes>
              {/* <Header />
              <Balance />
              <IncomeExpenses />
              <AddTransactionForm />
              <History /> */}
            </AuthProvider>
          </TransactionProvider>
        </BrowserRouter>
      </Box>
    </ThemeProvider>
  );
}

export default App;
