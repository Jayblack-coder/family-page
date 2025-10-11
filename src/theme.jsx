// src/theme.js
import { createTheme } from "@mui/material/styles";

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // 🌞 LIGHT MODE COLORS
          primary: {
            main: "#0A3D62", // Deep navy blue
            contrastText: "#FFFFFF",
          },
          secondary: {
            main: "#D4AF37", // Royal gold
            contrastText: "#FFFFFF",
          },
          background: {
            default: "#F9F9F9",
            paper: "#FFFFFF",
          },
          text: {
            primary: "#1A1A1A",
            secondary: "#5F6368",
          },
        }
      : {
          // 🌙 DARK MODE COLORS
          primary: {
            main: "#4FC3F7", // Soft blue glow
            contrastText: "#000000",
          },
          secondary: {
            main: "#FFD54F", // Muted gold
            contrastText: "#000000",
          },
          background: {
            default: "#0D1117",
            paper: "#161B22",
          },
          text: {
            primary: "#E6EDF3",
            secondary: "#9DA7B0",
          },
        }),
  },

  typography: {
    fontFamily: [
      "Poppins",
      "Open Sans",
      "Montserrat",
      "Playfair Display",
      "serif",
    ].join(","),
    h1: {
      fontFamily: "Playfair Display, serif",
      fontWeight: 700,
    },
    h2: {
      fontFamily: "Playfair Display, serif",
      fontWeight: 700,
    },
    h3: {
      fontFamily: "Playfair Display, serif",
      fontWeight: 600,
    },
    h4: {
      fontFamily: "Montserrat, sans-serif",
      fontWeight: 600,
    },
    h5: {
      fontFamily: "Montserrat, sans-serif",
      fontWeight: 500,
    },
    h6: {
      fontFamily: "Poppins, sans-serif",
      fontWeight: 500,
    },
    body1: {
      fontFamily: "Poppins, sans-serif",
      fontSize: "1rem",
    },
    body2: {
      fontFamily: "Open Sans, sans-serif",
      fontSize: "0.95rem",
    },
    button: {
      textTransform: "none",
      fontFamily: "Montserrat, sans-serif",
      fontWeight: 600,
      letterSpacing: "0.5px",
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: "10px 18px",
          transition: "all 0.3s ease",
          boxShadow: "0px 3px 8px rgba(0,0,0,0.15)",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0px 6px 12px rgba(0,0,0,0.25)",
          },
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingTop: "2rem",
          paddingBottom: "2rem",
        },
      },
    },
  },
});

export const createAppTheme = (mode) => createTheme(getDesignTokens(mode));
