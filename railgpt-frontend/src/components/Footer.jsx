import {
  Box,
  Typography,
  Container,
  IconButton,
} from "@mui/material";

import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";

function Footer() {
  return (
    <Box
      sx={{
        background:
          "linear-gradient(90deg,#240046,#3B0A57)",
        color: "white",
        py: 6,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          fontWeight="bold"
          fontSize= "20"
          align="center"
          gutterBottom
        >
          RailGPT
        </Typography>

        <Typography
          align="center"
          sx={{
            opacity: 0.9,
            mb: 1,
            fontSize: "1.5rem",
          }}
        >
          AI Smart Railway Assistant
        </Typography>

        <Typography
          align="center"
          sx={{
            opacity: 0.8,
            mb: 4,
            fontSize: "1.3rem",
          }}
        >
          Search trains, plan journeys and get
          AI-powered railway assistance.
        </Typography>

        {/* Social Links */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 2,
            mb: 3,
          }}
        >
          {/* GitHub */}
          <IconButton
            component="a"
            href="https://github.com/Poojap2203"
            target="_blank"
            sx={{ color: "white" }}
          >
            <GitHubIcon fontSize="large" />
          </IconButton>

          {/* Instagram */}
          <IconButton
            component="a"
            href="https://www.instagram.com/_poojaaaa_22_?igsh=MTdhY2N5cWNjdHR6ZA%3D%3D&utm_source=qr"
            target="_blank"
            sx={{ color: "white" }}
          >
            <InstagramIcon fontSize="large" />
          </IconButton>

          {/* LinkedIn */}
          <IconButton
            component="a"
            href="https://www.linkedin.com/in/pawarpooja22/"
            target="_blank"
            sx={{ color: "white" }}
          >
            <LinkedInIcon fontSize="large" />
          </IconButton>

          {/* Email */}
          <IconButton
            component="a"
            href="mailto:poojansk03@gmail.com"
            sx={{ color: "white" }}
          >
            <EmailIcon fontSize="large" />
          </IconButton>
        </Box>

        <Typography
          align="center"
          sx={{
            opacity: 0.9,
            mb: 3,
            fontSize: "1.5rem",
          }}
        >
          📧 poojansk03@gmail.com
        </Typography>

        <Box
          sx={{
            borderTop:
              "1px solid rgba(255,255,255,0.2)",
            pt: 2,
          }}
        >
          <Typography
            align="center"
            sx={{
              opacity: 0.8,
              fontSize: "1.5rem",
            }}
          >
            © 2026 RailGPT | Developed by Pooja Pawar
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;