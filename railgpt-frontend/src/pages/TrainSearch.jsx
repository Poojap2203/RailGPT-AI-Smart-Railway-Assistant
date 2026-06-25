import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  MenuItem,
  Button,
  Grid,
  IconButton,
  Chip,
  Divider,
} from "@mui/material";

import SwapVertIcon from "@mui/icons-material/SwapVert";
import TrainIcon from "@mui/icons-material/Train";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import dayjs from "dayjs";

const stations = [
  "Mumbai CSMT",
  "New Delhi",
  "Pune Junction",
  "Nashik Road",
  "Nagpur",
  "Manmad Junction",
  "Howrah Junction",
  "Sealdah",
  "Chennai Central",
  "Bengaluru City Junction",
  "Hyderabad Deccan",
  "Secunderabad Junction",
  "Ahmedabad Junction",
  "Surat",
  "Vadodara Junction",
  "Jaipur Junction",
  "Jodhpur Junction",
  "Lucknow Charbagh",
  "Kanpur Central",
  "Prayagraj Junction",
  "Patna Junction",
  "Bhopal Junction",
  "Indore Junction",
  "Thane",
  "Kalyan Junction",
  "Aurangabad",
  "Kolhapur",
  "Solapur",
  "Madgaon Junction",
  "Ernakulam Junction",
];

const classes = [
  { code: "SL", name: "Sleeper" },
  { code: "3A", name: "AC 3 Tier" },
  { code: "2A", name: "AC 2 Tier" },
  { code: "1A", name: "First AC" },
  { code: "CC", name: "AC Chair Car" },
];

const trainResults = [
  {
    number: "12110",
    name: "Panchavati Express",
    departure: "06:15 AM",
    arrival: "10:30 AM",
    duration: "4h 15m",
    crowd: "Low",
    delay: "4 min",
    fareSL: "₹180",
    fare3A: "₹520",

    aiReason: [
      "Lowest crowd level",
      "Excellent punctuality",
      "Best for daily commuters",
      "Affordable fares",
    ],

    confidence: "81%",
  },
  {
    number: "12109",
    name: "Godavari Express",
    departure: "07:20 AM",
    arrival: "11:45 AM",
    duration: "4h 25m",
    crowd: "Medium",
    delay: "8 min",
    fareSL: "₹190",
    fare3A: "₹560",
  aiReason: [
      "Lowest crowd level",
      "Excellent punctuality",
      "Best for daily commuters",
      "Affordable fares",
    ],

    confidence: "55%",
  },
  {
    number: "12071",
    name: "Jan Shatabdi Express",
    departure: "08:00 AM",
    arrival: "11:20 AM",
    duration: "3h 20m",
    crowd: "Low",
    delay: "2 min",
    fareSL: "₹220",
    fare3A: "₹640",
  aiReason: [
      "Lowest crowd level",
      "Excellent punctuality",
      "Best for daily commuters",
      "Affordable fares",
    ],

    confidence: "84%",
  },
  {
    number: "12139",
    name: "Sewagram Express",
    departure: "09:15 AM",
    arrival: "01:50 PM",
    duration: "4h 35m",
    crowd: "High",
    delay: "12 min",
    fareSL: "₹210",
    fare3A: "₹590",
  aiReason: [
      "Lowest crowd level",
      "Excellent punctuality",
      "Best for daily commuters",
      "Affordable fares",
    ],

    confidence: "90%",
  },
  {
    number: "11057",
    name: "Amritsar Express",
    departure: "10:40 AM",
    arrival: "03:30 PM",
    duration: "4h 50m",
    crowd: "Medium",
    delay: "7 min",
    fareSL: "₹200",
    fare3A: "₹570",
  aiReason: [
      "Lowest crowd level",
      "Excellent punctuality",
      "Best for daily commuters",
      "Affordable fares",
    ],

    confidence: "70%",
  },
  {
    number: "12127",
    name: "Intercity Express",
    departure: "12:15 PM",
    arrival: "04:25 PM",
    duration: "4h 10m",
    crowd: "Low",
    delay: "3 min",
    fareSL: "₹175",
    fare3A: "₹500",
  aiReason: [
      "Lowest crowd level",
      "Excellent punctuality",
      "Best for daily commuters",
      "Affordable fares",
    ],

    confidence: "79%",
  },
  {
    number: "22159",
    name: "CSMT Superfast Express",
    departure: "02:00 PM",
    arrival: "05:45 PM",
    duration: "3h 45m",
    crowd: "Medium",
    delay: "5 min",
    fareSL: "₹240",
    fare3A: "₹690",
  aiReason: [
      "Lowest crowd level",
      "Excellent punctuality",
      "Best for daily commuters",
      "Affordable fares",
    ],

    confidence: "82%",
  },
  {
    number: "11061",
    name: "Maharashtra Express",
    departure: "04:20 PM",
    arrival: "09:10 PM",
    duration: "4h 50m",
    crowd: "High",
    delay: "15 min",
    fareSL: "₹195",
    fare3A: "₹575",

    aiReason: [
      "Lowest crowd level",
      "Excellent punctuality",
      "Best for daily commuters",
      "Affordable fares",
    ],

    confidence: "69%",

  },
];

function TrainSearch() {
  const [openAI, setOpenAI] = useState(false);
const [selectedTrain, setSelectedTrain] = useState(null);
  const [journeyDate, setJourneyDate] = useState(dayjs());

  const [fromStation, setFromStation] =
    useState("Nashik Road");

  const [toStation, setToStation] =
    useState("Mumbai CSMT");

  const [showResults, setShowResults] =
    useState(false);

  const handleSwapStations = () => {
    const temp = fromStation;
    setFromStation(toStation);
    setToStation(temp);
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
          Search Trains
        </Typography>

        <Typography
          sx={{
            color: "#666",
            mb: 5,
          }}
        >
          Find trains for your journey
        </Typography>

        <Paper
          elevation={6}
          sx={{
            p: 5,
            borderRadius: 5,
          }}
        >
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 5 }}>
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

            <Grid
              size={{ xs: 12, md: 2 }}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <IconButton
                onClick={handleSwapStations}
                sx={{
                  width: 60,
                  height: 60,
                  color: "white",
                  background:
                    "linear-gradient(135deg,#7B2CBF,#3B0A57)",
                }}
              >
                <SwapVertIcon />
              </IconButton>
            </Grid>

            <Grid size={{ xs: 12, md: 5 }}>
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

            <Grid size={{ xs: 12, md: 6 }}>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
              >
                <DatePicker
                  label="Journey Date"
                  value={journeyDate}
                  onChange={(newValue) =>
                    setJourneyDate(newValue)
                  }
                  sx={{ width: "100%" }}
                />
              </LocalizationProvider>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                select
                fullWidth
                label="Class"
                defaultValue="SL"
              >
                {classes.map((cls) => (
                  <MenuItem
                    key={cls.code}
                    value={cls.code}
                  >
                    {cls.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>

          <Box
            sx={{
              textAlign: "center",
              mt: 5,
            }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={() =>
                setShowResults(true)
              }
              sx={{
                px: 6,
                py: 1.8,
                borderRadius: 4,
                background:
                  "linear-gradient(135deg,#7B2CBF,#3B0A57)",
              }}
            >
              Search Trains
            </Button>
          </Box>
        </Paper>

        {showResults && (
          <>
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{
                mt: 6,
                mb: 4,
                color: "#2D1B3D",
              }}
            >
              Available Trains
            </Typography>

            {trainResults.map((train) => (
              <Paper
                key={train.number}
                elevation={4}
                sx={{
                  p: 4,
                  mb: 3,
                  borderRadius: 4,
                }}
              >
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box>
                    <Typography
                      variant="h5"
                      fontWeight="bold"
                    >
                      <TrainIcon
                        sx={{
                          mr: 1,
                          verticalAlign: "middle",
                        }}
                      />
                      {train.name}
                    </Typography>

                    <Typography>
                      Train No: {train.number}
                    </Typography>
                  </Box>

                  <Chip
  label={`${train.crowd} Crowd`}
  color={
    train.crowd === "Low"
      ? "success"
      : train.crowd === "Medium"
      ? "warning"
      : "error"
  }
/>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Typography>
                  {fromStation} → {toStation}
                </Typography>

                <Typography sx={{ mt: 1 }}>
                  {train.departure} → {train.arrival}
                </Typography>

                <Typography sx={{ mt: 1 }}>
                  Duration: {train.duration}
                </Typography>

                <Typography sx={{ mt: 1 }}>
                  Expected Delay: {train.delay}
                </Typography>

                <Typography
                  sx={{
                    mt: 2,
                    color: "#7B2CBF",
                    fontWeight: 700,
                  }}
                >
                  SL {train.fareSL} | 3A {train.fare3A}
                </Typography>

                <Box sx={{ mt: 3 }}>
                  <Button
                    variant="outlined"
                    sx={{ mr: 2 }}
                  >
                    View Details
                  </Button>

                  <Button
  startIcon={<AutoAwesomeIcon />}
  variant="contained"
  onClick={() => {
    setSelectedTrain(train);
    setOpenAI(true);
  }}
  sx={{
    background:
      "linear-gradient(135deg,#7B2CBF,#3B0A57)",
  }}
>
  AI Recommendation
</Button>
                </Box>
              </Paper>
            ))}
          </>
        )}
      </Container>
      <Dialog
  open={openAI}
  onClose={() => setOpenAI(false)}
  maxWidth="sm"
  fullWidth
>
  <DialogTitle
    sx={{
      fontWeight: "bold",
      color: "#2D1B3D",
    }}
  >
    🤖 RailGPT AI Recommendation
  </DialogTitle>

  <DialogContent>
    <Typography
      variant="h5"
      fontWeight="bold"
      sx={{ mb: 3 }}
    >
      {selectedTrain?.name}
    </Typography>

    {selectedTrain?.aiReason?.map(
      (reason, index) => (
        <Typography
          key={index}
          sx={{ mb: 2 }}
        >
          ✓ {reason}
        </Typography>
      )
    )}

    <Typography
      sx={{
        mt: 4,
        fontWeight: "bold",
        color: "#7B2CBF",
      }}
    >
      AI Confidence:{" "}
      {selectedTrain?.confidence}
    </Typography>
  </DialogContent>

  <DialogActions>
    <Button
      onClick={() => setOpenAI(false)}
    >
      Close
    </Button>
  </DialogActions>
</Dialog>
    </Box>
  );
}

export default TrainSearch;