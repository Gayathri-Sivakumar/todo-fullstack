import React, { useState, useContext } from "react";
import {
  Grid,
  TextField,
  Button,
  Paper,
  Typography,
  Alert,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import AuthContext from "../context/AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    let valid = true;

    if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
      valid = false;
    }

    if (!formData.password || formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post(
        "http://localhost:8081/auth/login",
        formData
      );
      if (response?.data) {
        login({ token: response.data.token });
        navigate("/home");
      } else {
        setError("Unexpected response structure.");
      }
    } catch (error) {
      setError(
        error.response?.data?.error ||
          "An error occurred. Please try again later."
      );
    }
  };

  return (
    <div className="login-container">
      <Grid container component="main" className="login-grid">
        <Grid item xs={false} sm={4} md={7} className="login-image" />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          className="login-paper"
        >
          <div className="login-content">
            {error && <Alert severity="error">{error}</Alert>}
            <Typography component="h1" variant="h5">
              Welcome Back
            </Typography>
            <form onSubmit={handleLogin} className="login-form">
              <TextField
                id="email"
                label="E-mail"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.email}
                onChange={handleChange}
                name="email"
                required
                error={!!errors.email}
                helperText={errors.email}
              />
              <TextField
                id="password"
                label="Password"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.password}
                onChange={handleChange}
                name="password"
                type="password"
                required
                error={!!errors.password}
                helperText={errors.password}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className="login-button"
              >
                Log In
              </Button>
            </form>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
