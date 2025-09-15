import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar position="sticky" elevation={4} sx={{ bgcolor: "#1a1a1a", width: '100%' }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{ letterSpacing: 1 }}
          component={Link}
          to="/"
          style={{ textDecoration: "none", color: "white" }}
        >
          Nmelonye Family Legacy
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to="/family1">
            About us
          </Button>
          <Button color="inherit" component={Link} to="/family2">
            Lineage
          </Button>
          <Button color="inherit" component={Link} to="/family3">
            Family Three
          </Button>
          <Button color="inherit" component={Link} to="/family4">
            Family Four
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
export default Navbar
