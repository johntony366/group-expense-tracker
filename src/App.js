import { Box } from "@mui/material";
import { ThemeProvider } from "@mui/material"

import { Header } from "./components/Header";
import { Balance } from "./components/Balance";
import { IncomeExpenses } from "./components/IncomeExpenses";
import { History } from "./components/History"
import { AddTransactionForm } from "./components/AddTransaction"

import { appTheme } from "./theme";
import "./App.css";

function App() {
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
          maxWidth: "600px",
        }}
      >
        <Header />
        <Balance />
        <IncomeExpenses />
        <History />
        <AddTransactionForm />
      </Box>
    </ThemeProvider>
  );
}

export default App;
