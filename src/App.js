import { Box } from "@mui/material";
import "./App.css";

import { Header } from "./components/Header";
import { Balance } from "./components/Balance";

function App() {
  return (
    <Box
      className="App"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        maxWidth: "600px"
      }}
    >
      <Header />
      <Balance />
    </Box>
  );
}

export default App;
