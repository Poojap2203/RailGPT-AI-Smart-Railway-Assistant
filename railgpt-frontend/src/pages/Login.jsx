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

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [success, setSuccess] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);

      const response =
        await axios.post(
          "https://railgpt-backend.onrender.com/login",
          {
            email,
            password,
          }
        );

      if (
  response.data.success
) {
  localStorage.setItem(
    "user",
    response.data.name
  );

  setSuccess(true);

  setMessage(
    `Welcome ${response.data.name}! Login Successful.`
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
          width: 450,
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
          Login
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
          onClick={handleLogin}
          disabled={loading}
          sx={{
            py: 1.5,
            borderRadius: 3,
            background:
              "linear-gradient(135deg,#7B2CBF,#3B0A57)",
          }}
        >
          {loading
            ? "Logging In..."
            : "Login"}
        </Button>
        {success && (
  <Box
    sx={{
      mt: 3,
      display: "flex",
      gap: 2,
    }}
  >
    <Button
      fullWidth
      variant="outlined"
      onClick={() =>
        navigate("/")
      }
    >
      Go To Home
    </Button>

    <Button
      fullWidth
      variant="contained"
      onClick={() =>
        navigate("/ai-planner")
      }
      sx={{
        background:
          "linear-gradient(135deg,#7B2CBF,#3B0A57)",
      }}
    >
      AI Planner
    </Button>
  </Box>
)}
      </Paper>
    </Box>
  );
}

export default Login;