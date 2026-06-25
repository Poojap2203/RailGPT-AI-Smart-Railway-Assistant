import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import railwayImage from "../assets/railway.jpg";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

function Hero() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        backgroundImage: `url(${railwayImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right, rgba(255,245,238,0.95) 25%, rgba(255,245,238,0.75) 50%, rgba(255,245,238,0.2) 75%, transparent 100%)",
        }}
      />

      <Container
        maxWidth={false}
        sx={{
          position: "relative",
          zIndex: 2,
          px: { xs: 3, md: 8 },
        }}
      >
        <Box
          sx={{
            maxWidth: "700px",
          }}
        >
          <Typography
            sx={{
              fontSize: {
                xs: "3.5rem",
                md: "6rem",
              },
              fontWeight: 500,
              lineHeight: 1.05,
              color: "#2D1B3D",
              mb: 4,
            }}
          >
            Your Journey,
            <br />
            Smarter with AI
          </Typography>

          <Typography
            sx={{
              fontSize: {
                xs: "1.2rem",
                md: "1.8rem",
              },
              color: "#333",
              mb: 6,
              maxWidth: "650px",
            }}
          >
            Plan, search and manage your train journeys
            with the power of Artificial Intelligence.
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 3,
              flexWrap: "wrap",
            }}
          >
            <Button
              onClick={() => navigate("/search")}
              variant="contained"
              sx={{
                px: 6,
                py: 2.2,
                minWidth: 220,
                borderRadius: "20px",
                textTransform: "none",
                fontSize: "1.2rem",
                fontWeight: 700,
                background: "#4C1D95",
                boxShadow:
                  "0 15px 30px rgba(76,29,149,0.35)",

                "&:hover": {
                  background: "#3B0A57",
                },
              }}
            >
              Search Trains
            </Button>

            <Button
              onClick={() => navigate("/ai-planner")}
              variant="contained"
              startIcon={<AutoAwesomeIcon />}
              sx={{
                px: 6,
                py: 2.2,
                minWidth: 260,
                borderRadius: "20px",
                textTransform: "none",
                fontSize: "1.2rem",
                fontWeight: 700,
                background: "#2D1B3D",
                color: "#F4A261",
                border: "1px solid #F4A261",

                "&:hover": {
                  background: "#240046",
                },
              }}
            >
              AI Travel Planner
            </Button>
          </Box>
        </Box>

        {/* Floating Card */}
        <Paper
          elevation={12}
          sx={{
            position: "absolute",
            top: "50%",
            right: "6%",
            transform: "translateY(-50%)",
            width: 520,
            p: 4,
            borderRadius: 5,
            background: "rgba(36,0,70,0.92)",
            color: "white",
            backdropFilter: "blur(12px)",

            display: {
              xs: "none",
              lg: "block",
            },
          }}
        >
          <Typography
            sx={{
              color: "#F4A261",
              fontWeight: 700,
              fontSize: "1.7rem",
              mb: 3,
            }}
          >
            NEXT DEPARTURE
          </Typography>

          <Typography
            sx={{
              fontSize: "4rem",
              fontWeight: 500,
              mb: 3,
            }}
          >
            12051
          </Typography>

          <Typography
            sx={{
              fontSize: "2rem",
              mb: 2,
            }}
          >
            Mumbai CSMT → Pune Jn
          </Typography>

          <Typography
            sx={{
              color: "#FFD166",
              fontWeight: 600,
              fontSize: "1.7rem",
            }}
          >
            09:30 AM • On Time
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}

export default Hero;