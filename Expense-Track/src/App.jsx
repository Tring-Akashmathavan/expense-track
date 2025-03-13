import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import NavBar from "./Components/Navigation/NavBar";
import Dashboard from "./Components/Pages/Dashboard";
import AddExpense from "./Components/Expense/AddExpense";
import ExpenseTable from "./Components/Expense/ExpenseTable";
import PrivateRoute from "./Components/Route/PrivateRoute";
import SignIn from "./Components/Pages/SignIn";
import SignUp from "./Components/Pages/SignUp";
import HomePage from "./Components/Pages/HomePage";
import "./App.css";
import { Navigate } from "react-router-dom";

const theme = createTheme();

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <NavBar />
        <Routes>
          {/* Public Routes */}
          <Route path="/HomePage" element={<HomePage/>}/>
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/SignUp" element={<SignUp />} />

          {/* Private Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/AddExpense" element={<AddExpense />} />
            <Route path="/ExpenseTable" element={<ExpenseTable />} />
          </Route>

          {/* Default Redirect */}
          <Route path="/" element={<Navigate to="/Dashboard" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;