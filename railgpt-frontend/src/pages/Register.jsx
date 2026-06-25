import { useState } from "react";
import axios from "axios";

import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [mobile, setMobile] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [success, setSuccess] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const handleRegister = async () => {
    try {
      setLoading(true);

      const response =
        await axios.post(
          "http://https://railgpt-backend.onrender.com/register",
          {
            name,
            email,
            mobile,
            password,
          }
        );

      if (
        response.data.success
      ) {
        setSuccess(true);

        setMessage(
          "Registration Successful!"
        );
      } else {
        setSuccess(false);

        setMessage(
          response.data.message
        );
      }
    } catch (error) {
      setSuccess(false);

      setMessage(
        "Unable to connect to server."
      );

      console.error(error);
    }

    setLoading(false);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#FFF5EE",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 5,
          width: 500,
          borderRadius: 5,
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{
            color: "#2D1B3D",
            mb: 3,
            textAlign: "center",
          }}
        >
          Create Account
        </Typography>

        {message && (
          <Alert
            severity={
              success
                ? "success"
                : "error"
            }
            sx={{ mb: 3 }}
          >
            {message}
          </Alert>
        )}

        <TextField
          fullWidth
          label="Full Name"
          value={name}
          onChange={(e) =>
            setName(
              e.target.value
            )
          }
          sx={{ mb: 3 }}
        />

        <TextField
          fullWidth
          label="Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          sx={{ mb: 3 }}
        />

        <TextField
          fullWidth
          label="Mobile Number"
          value={mobile}
          onChange={(e) =>
            setMobile(
              e.target.value
            )
          }
          sx={{ mb: 3 }}
        />

        <TextField
          fullWidth
          type="password"
          label="Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          sx={{ mb: 3 }}
        />

        <Button
          fullWidth
          variant="contained"
          onClick={
            handleRegister
          }
          disabled={loading}
          sx={{
            py: 1.5,
            borderRadius: 3,
            background:
              "linear-gradient(135deg,#7B2CBF,#3B0A57)",
          }}
        >
          {loading
            ? "Registering..."
            : "Register"}
        </Button>

        {success && (
          <Box sx={{ mt: 3 }}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() =>
                navigate("/login")
              }
            >
              Go To Login
            </Button>
          </Box>
        )}
      </Paper>
    </Box>
  );
}

export default Register;