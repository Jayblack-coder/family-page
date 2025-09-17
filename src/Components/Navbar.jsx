import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (state) => () => {
    setOpen(state);
  };

  const navLinks = [
    { label: "About Us", path: "/family1" },
    { label: "Lineage", path: "/family2" },
    { label: "Family Three", path: "/family3" },
    { label: "Family Four", path: "/family4" },
  ];

  return (
    <>
      <AppBar
        position="sticky"
        elevation={6}
        sx={{
          bgcolor: "#1a1a1a",
          width: "100%",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Brand / Logo */}
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

          {/* Desktop Menu */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            {navLinks.map((link) => (
              <Button
                key={link.label}
                color="inherit"
                component={Link}
                to={link.path}
                sx={{
                  fontWeight: "bold",
                  textTransform: "none",
                  ":hover": { bgcolor: "#333", borderRadius: 2 },
                }}
              >
                {link.label}
              </Button>
            ))}
          </Box>

          {/* Mobile Toggle */}
          <IconButton
            sx={{ display: { xs: "flex", md: "none" }, color: "white" }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer for Mobile */}
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            width: 250,
            bgcolor: "#1a1a1a",
            height: "100%",
            color: "white",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              p: 2,
            }}
          >
            <IconButton onClick={toggleDrawer(false)} sx={{ color: "white" }}>
              <CloseIcon />
            </IconButton>
          </Box>
          <List>
            {navLinks.map((link) => (
              <ListItem key={link.label} disablePadding>
                <ListItemButton
                  component={Link}
                  to={link.path}
                  onClick={toggleDrawer(false)}
                  sx={{
                    color: "white",
                    "&:hover": { bgcolor: "#333" },
                  }}
                >
                  <ListItemText primary={link.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
