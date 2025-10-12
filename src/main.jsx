// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider, CssBaseline, useMediaQuery } from "@mui/material";
import App from "./App.jsx";
import { createAppTheme } from "./theme.js"; // import your theme config
import "./index.css";

// Wrap the app in a ThemeProvider component with automatic dark mode detection
function ThemedApp() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = createAppTheme(prefersDarkMode ? "dark" : "light");

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemedApp />
  </StrictMode>
);
