import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import Login from "./components/Login";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import Products from "./components/Products";
import Customers from "./components/Customers";
import Orders from "./components/Orders";
import Staff from "./components/Staff";
import Coupons from "./components/Coupons";
import Category from "./components/Category";
import AddCategory from "./components/Category/AddCategory";
import CustomSnackbar from "./components/Snackbar";
import { useState } from "react";
import AddProducts from "./components/Products/AddProducts";


function App() {




  const [message, setMessage] = useState(" ");
  const [msgData, setMsgData] = useState(false);

  const getValue = (open, msg) => {
    setMessage(msg);
    setMsgData(open);
    setTimeout(() => {
      setMsgData(false);
    }, 3000);
  };

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
            path="/customers"
            element={
              <Layout>
                <Customers />
              </Layout>
            }
          />
          <Route
            exact
            path="/orders"
            element={
              <Layout>
                <Orders />
              </Layout>
            }
          />
          <Route
            exact
            path="/coupons"
            element={
              <Layout>
                <Coupons />
              </Layout>
            }
          />
          <Route
            exact
            path="/staff"
            element={
              <Layout>
                <Staff />
              </Layout>
            }
          />
          <Route
            exact
            path="/category/add"
            element={
              <Layout>
                <AddCategory getValue={getValue} />
              </Layout>
            }
          />
          <Route
            exact
            path="/products/add"
            element={
              <Layout>
                <AddProducts getValue={getValue} />
              </Layout>
            }
          />
        </Routes>
        <CustomSnackbar open={msgData} msg={message} />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
