import React, { useState } from "react";
import { TextField, Button, Typography, Box, Link } from "@mui/material";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom"; 
import { ToastContainer, toast } from 'react-toastify';
import { showErrorToast, showSuccessToast } from "../Utils/toast";


const SIGN_IN = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      user {
        id
        name
        email
      }
      token
    }
  }
`;

const SignIn = ({ toggleForm }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginUser, { loading, error }] = useMutation(SIGN_IN);
  const navigate = useNavigate(); 
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showErrorToast("Invalid email format!");
      return;
    }
  
    try {
      const { data } = await loginUser({ variables: { email, password } });
      
      localStorage.setItem("token", data.loginUser.token);
      localStorage.setItem("user", JSON.stringify(data.loginUser.user)); // Store user info
      
      console.log("User logged in:", data.loginUser.user);
  
      showSuccessToast(`Welcome back, ${data.loginUser.user.name}!`);
      setTimeout(() => navigate("/dashboard"), 2500);
    } catch (err) {
      console.error("Error during sign in:", err);
      showErrorToast(`Sign in failed: ${err.message}`);
    }
  };
  

  return (
    <Box className="form-box" >
      <Typography className="form-title" component="h1" variant="h5">
        Sign In
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          className="form-input"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          className="form-input"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          className="form-submit-button"
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={loading}
        >
          {loading ? "Signing In..." : "Sign In"}
        </Button>
        {error && <p style={{ color: "red" }}>{error.message}</p>}
  
        <Link className="form-toggle-link" href="/SignUp" onClick={toggleForm}>
          Don't have an account? Sign Up
        </Link>
      </Box>
      <ToastContainer/>

    </Box>
  );
};

export default SignIn;