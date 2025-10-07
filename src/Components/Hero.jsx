import { Box, Typography, Button, Grid, Container } from "@mui/material";
import { Link } from "react-router-dom";
// import "../Components/Hero.css";



export default function Hero() {
  return (
    <Box sx={{ flexGrow: 1,
      minHeight: "80vh",
          backgroundImage: "url('../assets/tree.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          textAlign: "center",
          px: 3,
     }}>
      {/* Hero Section */}
      <Box 
        sx={{
          
        }}
      >
        <Container>
          <Typography variant="h3" fontWeight="bold" gutterBottom sx={{ textShadow: "2px 2px 4px rgba(0,0,0,0.6)" }}>
            Preserving Our Family Legacy
          </Typography>
          <Typography variant="h6" maxWidth="700" mx="auto" sx={{ textShadow: "1px 1px 3px rgba(0,0,0,0.5)" }}>
            Discover the stories, traditions, and memories passed down through generations, 
            celebrating the strength of our family roots.
          </Typography>
        </Container>
     </Box>
      {/* Buttons Section */}
      <Container sx={{ py: 6,
        flexDirection: "column", alignItems: "center"
       }}>
        <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
          Explore Family Branches
        </Typography>
        <Grid sx={{ display: "flex", }}container spacing={3}  justifyContent="center" mt={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              fullWidth
              variant="contained"
              size="large"
              component={Link}
              to="/nwankwo"
              sx={{ bgcolor: "#1976d2", py: 2, borderRadius: 2 }}
            >
              Nwankwo Family
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              fullWidth
              variant="contained"
              size="large"
              component={Link}
              to="/asouzu"
              sx={{ bgcolor: "#9c27b0", py: 2, borderRadius: 2 }}
            >
              Asouzu Family
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              fullWidth
              variant="contained"
              size="large"
              component={Link}
              to="/udorji"
              sx={{ bgcolor: "#2e7d32", py: 2, borderRadius: 2 }}
            >
              Udorji Family
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              fullWidth
              variant="contained"
              size="large"
              component={Link}
              to="/okoli"
              sx={{ bgcolor: "#ff9800", py: 2, borderRadius: 2 }}
            >
              Okoli Family
            </Button>
          </Grid>
        </Grid>
      </Container>
      </Box>
    
  );
}
