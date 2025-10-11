// import { Box, Typography, Button, Grid, Container } from "@mui/material";
// import { Link } from "react-router-dom";
// import "./Hero.css";



// export default function Hero() {
//   return (
//     <>
//       {/* Hero Section */}
//       <Box className="hero-section"
        
//       >
//         <Container>
//           <Typography variant="h3" fontWeight="bold" gutterBottom sx={{ textShadow: "2px 2px 4px rgba(0,0,0,0.6)" }}>
//             Preserving Our Family Legacy
//           </Typography>
//           <Typography variant="h6" maxWidth="700" mx="auto" sx={{ textShadow: "1px 1px 3px rgba(0,0,0,0.5)" }}>
//             Discover the stories, traditions, and memories passed down through generations, 
//             celebrating the strength of our family roots.
//           </Typography>
//         </Container>
//       </Box>

//       {/* Buttons Section */}
//       <Container sx={{ py: 6 }}>
//         <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
//           Explore Family Branches
//         </Typography>
//         <Grid container spacing={3} justifyContent="center" mt={2}>
//           <Grid item xs={12} sm={6} md={3}>
//             <Button
//               fullWidth
//               variant="contained"
//               size="large"
//               component={Link}
//               to="/nwankwo"
//               sx={{ bgcolor: "#1976d2", py: 2, borderRadius: 2 }}
//             >
//               Nwankwo Family
//             </Button>
//           </Grid>
//           <Grid item xs={12} sm={6} md={3}>
//             <Button
//               fullWidth
//               variant="contained"
//               size="large"
//               component={Link}
//               to="/asouzu"
//               sx={{ bgcolor: "#9c27b0", py: 2, borderRadius: 2 }}
//             >
//               Asouzu Family
//             </Button>
//           </Grid>
//           <Grid item xs={12} sm={6} md={3}>
//             <Button
//               fullWidth
//               variant="contained"
//               size="large"
//               component={Link}
//               to="/udorji"
//               sx={{ bgcolor: "#2e7d32", py: 2, borderRadius: 2 }}
//             >
//               Udorji Family
//             </Button>
//           </Grid>
//           <Grid item xs={12} sm={6} md={3}>
//             <Button
//               fullWidth
//               variant="contained"
//               size="large"
//               component={Link}
//               to="/okoli"
//               sx={{ bgcolor: "#ff9800", py: 2, borderRadius: 2 }}
//             >
//               Okoli Family
//             </Button>
//           </Grid>
//         </Grid>
//       </Container>
//     </>
//   );
// }
import { Box, Typography, Button, Grid, Container } from "@mui/material";
import { Link } from "react-router-dom";
// import "./Hero.css";
import familyTree from "../assets/family-tree.jpg"; // ✅ import the image

export default function Hero() {
  return (
    <>
      {/* Hero Section */}
      <Box
        className="hero-section"
        sx={{
          minHeight: "80vh",
          backgroundImage: `url(${familyTree})`, // ✅ use the imported image
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          textAlign: "center",
          px: 3,
        }}
      >
        <Container>
          <Typography
            variant="h3"
            fontWeight="bold"
            gutterBottom
            sx={{ textShadow: "2px 2px 4px rgba(0,0,0,0.6)" }}
          >
            Preserving Our Family Legacy
          </Typography>
          <Typography
            variant="h6"
            maxWidth="700"
            mx="auto"
            sx={{ textShadow: "1px 1px 3px rgba(0,0,0,0.5)" }}
          >
            Discover the stories, traditions, and memories passed down through generations,
            celebrating the strength of our family roots.
          </Typography>
        </Container>
      </Box>

      {/* Buttons Section */}
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
          Explore Family Branches
        </Typography>
        <Grid container spacing={3} justifyContent="center" mt={2}>
          {[
            { label: "Nwankwo Family", color: "#1976d2", to: "/nwankwo" },
            { label: "Asouzu Family", color: "#9c27b0", to: "/asouzu" },
            { label: "Udorji Family", color: "#2e7d32", to: "/udorji" },
            { label: "Okoli Family", color: "#ff9800", to: "/okoli" },
          ].map((btn) => (
            <Grid item xs={12} sm={6} md={3} key={btn.to}>
              <Button
                fullWidth
                variant="contained"
                size="large"
                component={Link}
                to={btn.to}
                sx={{ bgcolor: btn.color, py: 2, borderRadius: 2 }}
              >
                {btn.label}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
