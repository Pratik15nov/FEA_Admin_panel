import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard"

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/dashboard" element={<Dashboard/>} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
