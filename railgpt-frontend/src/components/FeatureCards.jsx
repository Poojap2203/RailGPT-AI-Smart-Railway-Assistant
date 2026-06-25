import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
} from "@mui/material";

import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import GroupsIcon from "@mui/icons-material/Groups";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TrainIcon from "@mui/icons-material/Train";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import SmartToyIcon from "@mui/icons-material/SmartToy";
const features = [
  {
    title: "AI Travel Planner",
    description:
      "Get intelligent train recommendations based on your journey.",
    icon: <AutoAwesomeIcon sx={{ fontSize: 40 }} />,
  },
  {
    title: "Crowd Prediction",
    description:
      "Predict train crowd levels before boarding.",
    icon: <GroupsIcon sx={{ fontSize: 40 }} />,
  },
  {
    title: "Delay Prediction",
    description:
      "Know expected train delays using AI analysis.",
    icon: <AccessTimeIcon sx={{ fontSize: 40 }} />,
  },
  {
    title: "Platform Predictor",
    description:
      "Estimate likely platform numbers before arrival.",
    icon: <TrainIcon sx={{ fontSize: 40 }} />,
  },
  {
    title: "PNR Prediction",
    description:
      "Predict confirmation chances for waitlisted tickets.",
    icon: <ConfirmationNumberIcon sx={{ fontSize: 40 }} />,
  },
  {
  title: "AI Railway Assistant",
  description:
    "Ask railway-related questions and get instant AI-powered assistance.",
  icon: <SmartToyIcon sx={{ fontSize: 40 }} />,
},
];

function FeatureCards() {
  return (
    <Box
      sx={{
        py: 10,
        background: "#FFF5EE",
      }}
    >
      <Container maxWidth="xl">
        <Typography
          variant="h3"
          fontWeight="bold"
          textAlign="center"
          sx={{
            color: "#2D1B3D",
            mb: 2,
          }}
        >
          Powerful AI Features
        </Typography>

        <Typography
          textAlign="center"
          sx={{
            color: "#666",
            mb: 8,
            fontSize: "1.1rem",
          }}
        >
          Smart railway assistance powered by Artificial Intelligence
        </Typography>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid
              key={index}
              size={{ xs: 12, sm: 6, md: 4 }}
            >
              <Card
                sx={{
                  height: "100%",
                  borderRadius: "24px",
                  background: "#fff",
                  transition: "0.3s",
                  cursor: "pointer",

                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow:
                      "0 15px 40px rgba(59,10,87,0.15)",
                  },
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box
                    sx={{
                      width: 70,
                      height: 70,
                      borderRadius: "18px",
                      background:
                        "linear-gradient(135deg,#F4A261,#7B2CBF)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      mb: 3,
                    }}
                  >
                    {feature.icon}
                  </Box>

                  <Typography
                    variant="h5"
                    fontWeight="bold"
                    sx={{ mb: 2 }}
                  >
                    {feature.title}
                  </Typography>

                  <Typography color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default FeatureCards;