import { Box } from "@mui/material";
import { ThemeProvider } from "@mui/material";

import { Header } from "./components/Header";
import { Balance } from "./components/Balance";
import { IncomeExpenses } from "./components/IncomeExpenses";
import { History } from "./components/History";
import { AddTransactionForm } from "./components/AddTransaction";
import { TransactionProvider } from "./context/TransactionProvider";

import { appTheme } from "./theme";
import "./App.css";

function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <TransactionProvider>
        <Box
          className="App"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "clamp(300px, 50%, 800px)",
            p: "48px",
          }}
        >
          <Header />
          <Balance />
          <IncomeExpenses />
          <AddTransactionForm />
          <History />
        </Box>
      </TransactionProvider>
    </ThemeProvider>
  );
}

export default App;
