import { Box, Container, Typography, Link, Stack, Button } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
 import { useLocation } from "react-router-dom";

const Footer = () => {
  const token = localStorage.getItem("token");
  const location = useLocation();

  const protectedPages = [
    "/home",
    "/nwankwo",
    "/asouzu",
    "/udorji",
    "/okoli",
    "/anyaga",
  ];

  const showWhatsapp =
    token && protectedPages.includes(location.pathname);
   return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#0A3D62",
        color: "#fff",
        mt: 6,
        py: 3,
        borderTop: "4px solid #1976d2",
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          justifyContent="space-between"
          alignItems="center"
        >
          {/* Family Info */}
          <Box textAlign={{ xs: "center", md: "left" }}>
            <Typography variant="body1" fontWeight="bold">
              Nmelonye Family Heritage Platform
            </Typography>

            <Typography variant="body2">
              Preserving our ancestry and connecting generations.
            </Typography>

            <Typography variant="caption">
              © {new Date().getFullYear()} Nmelonye Family. All Rights Reserved.
            </Typography>
          </Box>
{showWhatsapp && (
  <Button
    href="https://chat.whatsapp.com/YOUR_INVITE_LINK"
    target="_blank"
    rel="noopener noreferrer"
    startIcon={<WhatsAppIcon />}
  >
    Join Family WhatsApp
  </Button>
)}
          {/* WhatsApp Group */}
          {/* <Box textAlign="center">
            <Link
              href="https://chat.whatsapp.com/YOUR_GROUP_LINK"
              target="_blank"
              rel="noopener noreferrer"
              underline="none"
              sx={{
                color: "#25D366",
                display: "flex",
                alignItems: "center",
                gap: 1,
                fontWeight: "bold",
                justifyContent: "center",
                transition: "0.3s",
                "&:hover": {
                  color: "#fff",
                },
              }}
            >
              <WhatsAppIcon />
              Join Family WhatsApp Platform
            </Link>
          </Box> */}

          {/* Designer Credit */}
          <Box textAlign={{ xs: "center", md: "right" }}>
            <Typography variant="body2">
              Designed & Developed by
            </Typography>

            <Typography
              variant="body1"
              fontWeight="bold"
              sx={{ color: "#90caf9" }}
            >
              Engr. Ejike C. Nwankwo
            </Typography>

            <Typography variant="body2">
              📞 +234 8102575097
            </Typography>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;