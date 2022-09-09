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
import UpdateCustomers from "./components/Customers/updatecustomers";
import CustomersOrders from "./components/Customers-orders";
import AddCoupons from "./components/Coupons/Editcoupons";
import Settings from "./components/settings";
import AddRights from "./components/Rights/AddRights";
import AddStaff from "./components/Staff/AddStaff";
import Menu from "./components/Menu";
import Rights from "./components/Rights";
import Role from "./components/Role";

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
            path="/customerorders"
            element={
              <Layout>
                <CustomersOrders />
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
                <AddCategory />
              </Layout>
            }
          />
          <Route
            exact
            path="/products/add"
            element={
              <Layout>
                <AddProducts />
              </Layout>
            }
          />
          <Route
            exact
            path="/customers/add"
            element={
              <Layout>
                <UpdateCustomers />
              </Layout>
            }
          />
          <Route
            exact
            path="/coupons/add"
            element={
              <Layout>
                <AddCoupons />
              </Layout>
            }
          />
          <Route
            exact
            path="/staff/add"
            element={
              <Layout>
                <AddStaff />
              </Layout>
            }
          />
          <Route
            exact
            path="/settings"
            element={
              <Layout>
                <Settings />
              </Layout>
            }
          />
          <Route
            exact
            path="/menu"
            element={
              <Layout>
                <Menu />
              </Layout>
            }
          />
          <Route
            exact
            path="/rights"
            element={
              <Layout>
                <Rights />
              </Layout>
            }
          />
          <Route
            exact
            path="/role"
            element={
              <Layout>
                <Role />
              </Layout>
            }
          />
          <Route
            exact
            path="/rights/add"
            element={
              <Layout>
                <AddRights />
              </Layout>
            }
          />
        </Routes>
        <CustomSnackbar />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
