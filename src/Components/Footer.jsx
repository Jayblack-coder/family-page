import { Box, Container, Typography, Link, Stack, Button } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
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
    background: "linear-gradient(135deg, #1976d2 0%, #004aad 100%)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    borderTop: "3px solid rgba(255,255,255,0.15)",
    boxShadow: "0 -8px 32px rgba(0,0,0,0.15)",
    color: "#fff",
    mt: 6,
    py: 3,
    position: "relative",
    overflow: "hidden",
  }}
>
    <Box
  sx={{
    position: "absolute",
    top: -80,
    right: -80,
    width: 200,
    height: 200,
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(25,118,210,0.35) 0%, rgba(25,118,210,0) 70%)",
    pointerEvents: "none",
  }}
/>

<Box
  sx={{
    position: "absolute",
    bottom: -100,
    left: -100,
    width: 250,
    height: 250,
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(144,202,249,0.15) 0%, rgba(144,202,249,0) 70%)",
    pointerEvents: "none",
  }}
/>
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

           <Typography
  variant="body2"
  sx={{
    mt: 1,
    color: "rgba(255,255,255,0.75)",
    fontStyle: "italic",
  }}
>
  "Preserving Our Heritage, Connecting Generations."
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
  sx={{
    bgcolor: "rgba(37,211,102,0.15)",
    color: "#25D366",
    border: "1px solid rgba(37,211,102,0.3)",
    borderRadius: "30px",
    px: 3,
    py: 1,
    fontWeight: "bold",
    backdropFilter: "blur(10px)",
    "&:hover": {
      bgcolor: "rgba(37,211,102,0.25)",
      transform: "translateY(-2px)",
    },
    transition: "all 0.3s ease",
  }}
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
  sx={{
    color: "#90caf9",
    letterSpacing: "0.05em",
    textTransform: "uppercase",
  }}
>
  Engr. Ejike C. Nwankwo
</Typography>

            <Typography variant="body2">
  <PhoneIcon
    sx={{
      color: "#FFD700",
      fontSize: 18,
      verticalAlign: "middle",
      mr: 0.5,
    }}
  />
  +234 8102575097
</Typography>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;