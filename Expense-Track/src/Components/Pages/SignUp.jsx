import React, { useState } from "react";
import { TextField, Button, Typography, Box, Link } from "@mui/material";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom"; 
import { ToastContainer, toast } from 'react-toastify';
import { showErrorToast, showSuccessToast } from "../Utils/toast";


const SIGN_UP = gql`
  mutation RegisterUser($name: String!, $email: String!, $password: String!) {
    registerUser(name: $name, email: $email, password: $password) {
      user {
        id
        name
        email
      }
      token
    }
  }
`;

const SignUp = ({ toggleForm }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registerUser, { loading, error }] = useMutation(SIGN_UP);
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (!emailRegex.test(email)) {
      showErrorToast('Invalid Email Format');
      return;
    }
  
    if (password !== confirmPassword) {
      showErrorToast("Passwords Do Not Match!");
      return;
    }
  
    try {
      const { data } = await registerUser({ variables: { name, email, password } });
  
      // Store token and user info
      localStorage.setItem("token", data.registerUser.token);
      localStorage.setItem("user", JSON.stringify(data.registerUser.user));
  
      console.log("User registered:", data.registerUser.user);
  
      // Show personalized success message
      showSuccessToast(`Welcome, ${data.registerUser.user.name}!`);
  
      setTimeout(() => {
        navigate("/dashboard");
      }, 2500);
    } catch (err) {
      console.error("Error during sign up:", err);
      showErrorToast(`Sign up failed: ${err.message}`);
    }
  };
  

  return (
    <Box className="form-box">
      <Typography className="form-title" component="h1" variant="h5">
        Sign Up
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          className="form-input"
          margin="normal"
          required
          fullWidth
          id="name"
          label="Name"
          name="name"
          autoComplete="name"
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          className="form-input"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
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
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          className="form-input"
          margin="normal"
          required
          fullWidth
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          id="confirmPassword"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button
          className="form-submit-button"
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={loading}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </Button>
        {error && <p style={{ color: "red" }}>{error.message}</p>}
        <Link className="form-toggle-link" href="/SignIn" onClick={toggleForm}>
          Already have an account? Sign In
        </Link>
      </Box>
      <ToastContainer/>
    </Box>
  );
};

export default SignUp;