import React from "react";
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
import Profile from "./components/Profile";
import Forgot from "./components/Forgot";
import ConfirmPassword from "./components/ConfirmPassword";
import PageNotFound from "./components/PageNotFound";
import ProtectedRoute from "./components/protectedRoutes";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/confirmPassword" element={<ConfirmPassword />} />
          <Route exact path="/dashboard" element={<ProtectedRoute />}>
            <Route
              exact
              path="/dashboard"
              element={
                <Layout>
                  <Dashboard />
                </Layout>
              }
            />
          </Route>
          <Route exact path="/products" element={<ProtectedRoute />}>
            <Route
              exact
              path="/products"
              element={
                <Layout>
                  <Products />
                </Layout>
              }
            />
          </Route>
          <Route exact path="/category" element={<ProtectedRoute />}>
            <Route
              exact
              path="/category"
              element={
                <Layout>
                  <Category />
                </Layout>
              }
            />
          </Route>
          <Route exact path="/customers" element={<ProtectedRoute />}>
            <Route
              exact
              path="/customers"
              element={
                <Layout>
                  <Customers />
                </Layout>
              }
            />
          </Route>
          <Route exact path="/orders" element={<ProtectedRoute />}>
            <Route
              exact
              path="/orders"
              element={
                <Layout>
                  <Orders />
                </Layout>
              }
            />
          </Route>
          <Route exact path="/customerorders" element={<ProtectedRoute />}>
            <Route
              exact
              path="/customerorders"
              element={
                <Layout>
                  <CustomersOrders />
                </Layout>
              }
            />
          </Route>
          <Route exact path="/coupons" element={<ProtectedRoute />}>
            <Route
              exact
              path="/coupons"
              element={
                <Layout>
                  <Coupons />
                </Layout>
              }
            />
          </Route>
          <Route exact path="/staff" element={<ProtectedRoute />}>
            <Route
              exact
              path="/staff"
              element={
                <Layout>
                  <Staff />
                </Layout>
              }
            />
          </Route>
          <Route exact path="/category/add" element={<ProtectedRoute />}>
            <Route
              exact
              path="/category/add"
              element={
                <Layout>
                  <AddCategory />
                </Layout>
              }
            />
          </Route>
          <Route exact path="/products/add" element={<ProtectedRoute />}>
            <Route
              exact
              path="/products/add"
              element={
                <Layout>
                  <AddProducts />
                </Layout>
              }
            />
          </Route>
          <Route exact path="/customers/add" element={<ProtectedRoute />}>
            <Route
              exact
              path="/customers/add"
              element={
                <Layout>
                  <UpdateCustomers />
                </Layout>
              }
            />
          </Route>
          <Route exact path="/coupons/add" element={<ProtectedRoute />}>
            <Route
              exact
              path="/coupons/add"
              element={
                <Layout>
                  <AddCoupons />
                </Layout>
              }
            />
          </Route>
          <Route exact path="/staff/add" element={<ProtectedRoute />}>
            <Route
              exact
              path="/staff/add"
              element={
                <Layout>
                  <AddStaff />
                </Layout>
              }
            />
          </Route>
          <Route exact path="/settings" element={<ProtectedRoute />}>
            <Route
              exact
              path="/settings"
              element={
                <Layout>
                  <Settings />
                </Layout>
              }
            />
          </Route>
          <Route exact path="/menu" element={<ProtectedRoute />}>
            <Route
              exact
              path="/menu"
              element={
                <Layout>
                  <Menu />
                </Layout>
              }
            />
          </Route>
          <Route exact path="/rights" element={<ProtectedRoute />}>
            <Route
              exact
              path="/rights"
              element={
                <Layout>
                  <Rights />
                </Layout>
              }
            />
          </Route>
          <Route exact path="/role" element={<ProtectedRoute />}>
            <Route
              exact
              path="/role"
              element={
                <Layout>
                  <Role />
                </Layout>
              }
            />
          </Route>
          <Route exact path="/rights/add" element={<ProtectedRoute />}>
            <Route
              exact
              path="/rights/add"
              element={
                <Layout>
                  <AddRights />
                </Layout>
              }
            />
          </Route>

          <Route exact path="/forgot" element={<Forgot />} />
          <Route exact path="/profile" element={<ProtectedRoute />}>
            <Route
              exact
              path="/profile"
              element={
                <Layout>
                  <Profile />
                </Layout>
              }
            />
          </Route>
          <Route path="/**" element={<PageNotFound />} />
        </Routes>
        <CustomSnackbar />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
