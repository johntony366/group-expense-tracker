import { Box } from "@mui/material";
import { ThemeProvider } from "@mui/material"

import { Header } from "./components/Header";
import { Balance } from "./components/Balance";
import { IncomeExpenses } from "./components/IncomeExpenses";

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
          height: "100vh",
          maxWidth: "600px",
        }}
      >
        <Header />
        <Balance />
        <IncomeExpenses />
      </Box>
    </ThemeProvider>
  );
}

export default App;
