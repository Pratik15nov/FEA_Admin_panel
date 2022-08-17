import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import Login from "./components/Login";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import Products from "./components/Products";
import Category from "./components/Category";
import AddCategory from "./components/Category/AddCategory";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route
            exact
            path="/dashboard"
            element={
              <Layout>
                <Dashboard />
              </Layout>
            }
          />
          <Route
            exact
            path="/products"
            element={
              <Layout>
                <Products />
              </Layout>
            }
          />
          <Route
            exact
            path="/category"
            element={
              <Layout>
                <Category />
              </Layout>
            }
          />
           <Route
            exact
            path="/category/add"
            element={
              <Layout>
                <AddCategory />
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
