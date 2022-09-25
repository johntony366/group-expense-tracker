import { Box } from "@mui/material"
import './App.css';
import { Header } from "./components/Header"

function App() {
  return (
    <Box className="App" sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh"
    }}>
      <Header/>
    </Box>
  );
}

export default App;
