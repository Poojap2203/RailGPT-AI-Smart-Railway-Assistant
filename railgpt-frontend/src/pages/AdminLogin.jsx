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

function AdminLogin() {
  const navigate = useNavigate();

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [success, setSuccess] =
    useState(false);

  const handleLogin = async () => {
    try {
      const response =
        await axios.post(
          "https://railgpt-backend.onrender.com/login",
          {
            username,
            password,
          }
        );

      if (
        response.data.success
      ) {
        localStorage.setItem(
  "admin",
  "true"
);

localStorage.setItem(
  "adminName",
  "Admin"
);

        setSuccess(true);

        setMessage(
          "Admin Login Successful"
        );

        setTimeout(() => {
          navigate(
            "/admin-dashboard"
          );
        }, 1000);
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
    }
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
          width: 450,
          borderRadius: 5,
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{
            textAlign: "center",
            mb: 3,
            color: "#240046",
          }}
        >
          Admin Login
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
          label="Username"
          value={username}
          onChange={(e) =>
            setUsername(
              e.target.value
            )
          }
          sx={{ mb: 3 }}
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
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
          onClick={handleLogin}
          sx={{
            py: 1.5,
            background:
              "linear-gradient(135deg,#7B2CBF,#3B0A57)",
          }}
        >
          Login
        </Button>
      </Paper>
    </Box>
  );
}

export default AdminLogin;