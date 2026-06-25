import { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

import {
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  MenuItem,
  Button,
  Grid,
  RadioGroup,
  FormControlLabel,
  Radio,
  Card,
  CardContent,
  Chip,
  Divider,
} from "@mui/material";

import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import SmartToyIcon from "@mui/icons-material/SmartToy";

const stations = [
  "Mumbai CSMT",
  "New Delhi",
  "Pune Junction",
  "Nashik Road",
  "Nagpur",
  "Manmad Junction",
  "Howrah Junction",
  "Chennai Central",
  "Bengaluru City Junction",
  "Ahmedabad Junction",
  "Jaipur Junction",
  "Lucknow Charbagh",
  "Patna Junction",
  "Bhopal Junction",
  "Aurangabad",
];

function AIPlanner() {
  const [fromStation, setFromStation] =
    useState("Nashik Road");

  const [toStation, setToStation] =
    useState("Pune Junction");
const [loading, setLoading] =
  useState(false);
  const [budget, setBudget] =
    useState("1000");

  const [priority, setPriority] =
    useState("fastest");

  const [showPlan, setShowPlan] =
    useState(false);

  const [aiPlan, setAiPlan] =
    useState(null);

  const [question, setQuestion] =
    useState("");

  const [chatHistory, setChatHistory] =
    useState([]);

  const generatePlan = () => {
    let recommendation = {};

    if (priority === "fastest") {
      recommendation = {
        train: "Jan Shatabdi Express",
        departure: "08:00 AM",
        arrival: "11:20 AM",
        fare: "₹640",
        crowd: "Low",
        delay: "2 Minutes",
        confidence: "94%",
        reasons: [
          "Fastest journey available",
          "Lowest delay probability",
          "Best for business travellers",
        ],
      };
    } else if (priority === "cheapest") {
      recommendation = {
        train: "Panchavati Express",
        departure: "06:15 AM",
        arrival: "10:30 AM",
        fare: "₹180",
        crowd: "Medium",
        delay: "4 Minutes",
        confidence: "91%",
        reasons: [
          "Lowest ticket cost",
          "Excellent value for money",
          "Suitable for budget travellers",
        ],
      };
    } else {
      recommendation = {
        train: "Godavari Express",
        departure: "07:20 AM",
        arrival: "11:45 AM",
        fare: "₹560",
        crowd: "Low",
        delay: "8 Minutes",
        confidence: "89%",
        reasons: [
          "Least crowded option",
          "Comfortable seating availability",
          "Better travel experience",
        ],
      };
    }

    setAiPlan(recommendation);
    setShowPlan(true);
  };

  const askRailGPT = async () => {
  if (!question.trim()) return;

  const userQuestion = question;

  setChatHistory((prev) => [
    ...prev,
    {
      user: userQuestion,
      bot: "🤖 RailGPT is thinking...",
    },
  ]);

  setQuestion("");
  setLoading(true);

  try {
    const response = await axios.post(
  "https://railgpt-backend.onrender.com/chat",
      {
        message: userQuestion,
      }
    );

    const aiReply =
      response.data.reply;

    setChatHistory((prev) => {
      const updated = [...prev];

      updated[
        updated.length - 1
      ].bot = aiReply;

      return updated;
    });
  } catch (error) {
    setChatHistory((prev) => {
      const updated = [...prev];

      updated[
        updated.length - 1
      ].bot =
        "Unable to connect to RailGPT backend.";

      return updated;
    });

    console.error(error);
  }

  setLoading(false);
};

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#FFF5EE",
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          fontWeight="bold"
          sx={{
            color: "#2D1B3D",
            mb: 1,
          }}
        >
          AI Journey Planner
        </Typography>

        <Typography
          sx={{
            color: "#666",
            mb: 5,
          }}
        >
          Let RailGPT recommend the best train for your journey.
        </Typography>

        <Paper
          elevation={6}
          sx={{
            p: 5,
            borderRadius: 5,
          }}
        >
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                select
                fullWidth
                label="From Station"
                value={fromStation}
                onChange={(e) =>
                  setFromStation(e.target.value)
                }
              >
                {stations.map((station) => (
                  <MenuItem
                    key={station}
                    value={station}
                  >
                    {station}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                select
                fullWidth
                label="To Station"
                value={toStation}
                onChange={(e) =>
                  setToStation(e.target.value)
                }
              >
                {stations.map((station) => (
                  <MenuItem
                    key={station}
                    value={station}
                  >
                    {station}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Budget (₹)"
                value={budget}
                onChange={(e) =>
                  setBudget(e.target.value)
                }
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Typography
                variant="h6"
                sx={{ mb: 2 }}
              >
                Journey Priority
              </Typography>

              <RadioGroup
                value={priority}
                onChange={(e) =>
                  setPriority(e.target.value)
                }
              >
                <FormControlLabel
                  value="fastest"
                  control={<Radio />}
                  label="Fastest Journey"
                />

                <FormControlLabel
                  value="cheapest"
                  control={<Radio />}
                  label="Cheapest Option"
                />

                <FormControlLabel
                  value="crowd"
                  control={<Radio />}
                  label="Least Crowded"
                />
              </RadioGroup>
            </Grid>
          </Grid>

          <Box
            sx={{
              textAlign: "center",
              mt: 4,
            }}
          >
            <Button
              startIcon={<AutoAwesomeIcon />}
              variant="contained"
              size="large"
              onClick={generatePlan}
              sx={{
                px: 5,
                py: 1.8,
                borderRadius: 4,
                background:
                  "linear-gradient(135deg,#7B2CBF,#3B0A57)",
              }}
            >
              Generate AI Plan
            </Button>
          </Box>
        </Paper>

        {showPlan && aiPlan && (
          <Card
            sx={{
              mt: 5,
              borderRadius: 5,
              boxShadow: 6,
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Typography
                variant="h4"
                fontWeight="bold"
                sx={{
                  color: "#2D1B3D",
                  mb: 3,
                }}
              >
                🤖 RailGPT Recommendation
              </Typography>

              <Chip
                label={`AI Confidence ${aiPlan.confidence}`}
                color="success"
                sx={{ mb: 3 }}
              />

              <Typography
                variant="h5"
                fontWeight="bold"
              >
                {aiPlan.train}
              </Typography>

              <Typography sx={{ mt: 2 }}>
                Route: {fromStation} → {toStation}
              </Typography>

              <Typography sx={{ mt: 1 }}>
                Departure: {aiPlan.departure}
              </Typography>

              <Typography sx={{ mt: 1 }}>
                Arrival: {aiPlan.arrival}
              </Typography>

              <Typography sx={{ mt: 1 }}>
                Fare: {aiPlan.fare}
              </Typography>

              <Typography sx={{ mt: 1 }}>
                Crowd Level: {aiPlan.crowd}
              </Typography>

              <Typography sx={{ mt: 1 }}>
                Delay Risk: {aiPlan.delay}
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  mt: 4,
                  mb: 2,
                }}
              >
                Why RailGPT Chose This Train
              </Typography>

              {aiPlan.reasons.map((reason, index) => (
                <Typography key={index}>
                  ✓ {reason}
                </Typography>
              ))}
            </CardContent>
          </Card>
        )}

        <Paper
          elevation={6}
          sx={{
            mt: 5,
            p: 4,
            borderRadius: 5,
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{
              color: "#2D1B3D",
              mb: 3,
            }}
          >
            <SmartToyIcon
              sx={{
                mr: 1,
                verticalAlign: "middle",
              }}
            />
            Ask RailGPT
          </Typography>

          <TextField
            fullWidth
            label="Ask anything about trains..."
            value={question}
            onChange={(e) =>
              setQuestion(e.target.value)
            }
          />

          <Button
  startIcon={<AutoAwesomeIcon />}
  variant="contained"
  sx={{
    mt: 3,
    background:
      "linear-gradient(135deg,#7B2CBF,#3B0A57)",
  }}
  onClick={askRailGPT}
  disabled={loading}
>
  {loading
    ? "Thinking..."
    : "Ask AI"}
</Button>

          {chatHistory.length > 0 && (
            <>
              <Divider sx={{ my: 4 }} />

              {chatHistory.map(
                (chat, index) => (
                  <Box
                    key={index}
                    sx={{ mb: 3 }}
                  >
                    <Typography
                      fontWeight="bold"
                    >
                      You:
                    </Typography>

                    <Typography
                      sx={{ mb: 1 }}
                    >
                      {chat.user}
                    </Typography>

                    <Typography
                      fontWeight="bold"
                    >
                      RailGPT:
                    </Typography>

                    <Box sx={{ mt: 1 }}>
  <ReactMarkdown>
    {chat.bot}
  </ReactMarkdown>
</Box>
                  </Box>
                )
              )}
            </>
          )}
        </Paper>
      </Container>
    </Box>
  );
}

export default AIPlanner;