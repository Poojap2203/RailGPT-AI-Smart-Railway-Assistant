import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Chip,
} from "@mui/material";

import {
  Link,
  useNavigate,
} from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const user =
  localStorage.getItem("user");

const admin =
  localStorage.getItem("admin");

const adminName =
  localStorage.getItem("adminName");

  const handleLogout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("admin");
  localStorage.removeItem("adminName");

  navigate("/");
  window.location.reload();
};

  return (
    <AppBar
      position="sticky"
      sx={{
        background:
          "linear-gradient(90deg,#240046,#3B0A57)",
        boxShadow:
          "0 4px 15px rgba(0,0,0,0.15)",
      }}
    >
      <Toolbar
        sx={{
          minHeight: {
  xs: 70,
  md: 90,
},
        }}
      >
        {/* Logo */}
        <Box
          sx={{
            width: {
  xs: 45,
  md: 60,
},
height: {
  xs: 45,
  md: 60,
},
fontSize: {
  xs: "1.5rem",
  md: "2rem",
},
            borderRadius: 2,
            background:
              "linear-gradient(135deg,#FFB38A,#F4A261)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            fontSize: "2rem",
            color: "#240046",
            mr: 2,
          }}
        >
          R
        </Box>

        {/* Brand */}
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            sx={{
              fontSize: "2rem",
              fontWeight: "bold",
              lineHeight: 1,
            }}
          >
            RailGPT
          </Typography>

          <Typography
            sx={{
              fontSize: "0.9rem",
              opacity: 0.9,
            }}
          >
            AI Smart Railway Assistant
          </Typography>
        </Box>

        {/* Navigation */}
        <Button
          component={Link}
          to="/"
          sx={{
            color: "white",
            textTransform: "none",
            fontSize: "1rem",
            mx: 1,
          }}
        >
          Home
        </Button>

        <Button
          component={Link}
          to="/search"
          sx={{
            color: "white",
            textTransform: "none",
            fontSize: "1rem",
            mx: 1,
          }}
        >
          Search Trains
        </Button>

        <Button
          component={Link}
          to="/ai-planner"
          sx={{
            color: "white",
            textTransform: "none",
            fontSize: "1rem",
            mx: 1,
          }}
        >
          AI Planner
        </Button>

        {!user ? (
          <>
            <Button
              component={Link}
              to="/register"
              sx={{
                color: "white",
                textTransform: "none",
                fontSize: "1rem",
                mx: 1,
              }}
            >
              Register
            </Button>

            <Button
              component={Link}
              to="/login"
              variant="outlined"
              sx={{
                ml: 1,
                color: "#FFB38A",
                borderColor: "#FFB38A",
                borderRadius: 3,
                textTransform: "none",

                "&:hover": {
                  borderColor: "#F4A261",
                },
              }}
            >
              Login
            </Button>
          </>
        ) : (
          <>
            <Chip
  label={
    admin
      ? "🛡️ Admin"
      : `👤 ${user}`
  }
              sx={{
                mr: 2,
                background:
                  "#FFB38A",
                color:
                  "#240046",
                fontWeight:
                  "bold",
              }}
            />

            <Button
              variant="outlined"
              onClick={
                handleLogout
              }
              sx={{
                color: "#FFB38A",
                borderColor:
                  "#FFB38A",
                borderRadius: 3,
                textTransform:
                  "none",

                "&:hover": {
                  borderColor:
                    "#F4A261",
                },
              }}
            >
              Logout
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;