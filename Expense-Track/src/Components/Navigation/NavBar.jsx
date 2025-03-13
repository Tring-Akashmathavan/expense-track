import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { showSuccessToast } from "../Utils/toast";
import "./NavBar.css"

const NavBar = () => {
  const navigate = useNavigate();

  // Check if the user is authenticated (e.g., by checking for a token in localStorage)
  const isAuthenticated = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    showSuccessToast("Logged out successfully!");
    navigate("/signin");
  };

  return (
    <AppBar position="static" className="app-bar">
      <Toolbar className="tool-bar">
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Expense Tracker
        </Typography>
        {isAuthenticated ? (
          <>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button color="black" component={Link} to="/signin">
              Sign In
            </Button>
            <Button color="black" component={Link} to="/signup">
              Sign Up
            </Button>
          </>
        )}
      </Toolbar>
      {/* ToastContainer should be included to display the toast */}
      <ToastContainer />
    </AppBar>
  );
};

export default NavBar;
