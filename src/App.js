import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Dashbaord from "./components/Dashboard";
import Category from "./components/Category";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/Navbar" element={<Navbar />} />
          <Route
            exact
            path="/Dashboard"
            element={
              <>
                <Navbar />
                <Dashbaord />
              </>
            }
          />
          <Route
            exact
            path="/Category"
            element={
              <>
                <Navbar />
                <Category />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
