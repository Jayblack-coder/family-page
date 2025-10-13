// import { useState } from "react";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Button,
//   Box,
//   IconButton,
//   Drawer,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemText,
// } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import CloseIcon from "@mui/icons-material/Close";
// import { Link } from "react-router-dom";

// const Navbar = () => {
//   const [open, setOpen] = useState(false);

//   const toggleDrawer = (state) => () => {
//     setOpen(state);
//   };
// const handleLogout = () => {
//   localStorage.removeItem("token");
//   localStorage.removeItem("userName");
//   navigate("/login");
// };

//   const navLinks = [
//     { label: "About Us", path: "/family1" },
//     { label: "Lineage", path: "/family2" },
//     { label: "Family Gallery", path: "/family3" },
//     { label: "Family Events", path: "/family4" },
//   ];

//   return (
//     <>
//       <AppBar
//         position="sticky"
//         elevation={6}
//         sx={{
//           bgcolor: "#1a1a1a",
//           width: "100%",
//         }}
//       >
//         <Toolbar
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             px: { xs: 2, sm: 3, md: 5 },
//           }}
//         >
//           {/* Brand / Logo */}
//           <Typography
//             variant="h6"
//             fontWeight="bold"
//             sx={{
//               letterSpacing: 1,
//               fontSize: { xs: "1rem", sm: "1.2rem", md: "1.4rem" },
//             }}
//             component={Link}
//             to="/"
//             style={{ textDecoration: "none", color: "white" }}
//           >
//             Nmelonye Family Legacy
//           </Typography>

//           {/* Desktop Menu */}
//           <Box sx={{ display: { xs: "none", md: "flex" }, gap: { md: 2, lg: 3 } }}>
//             {navLinks.map((link) => (
//               <Button
//                 key={link.label}
//                 color="inherit"
//                 component={Link}
//                 to={link.path}
//                 sx={{
//                   fontWeight: "bold",
//                   textTransform: "none",
//                   fontSize: { md: "0.95rem", lg: "1rem" },
//                   ":hover": { bgcolor: "#333", borderRadius: 2 },
//                 }}
//               >
//                 {link.label}
//               </Button>
//             ))}
//           </Box>

//           {/* Mobile Toggle */}
//           <IconButton
//             sx={{ display: { xs: "flex", md: "none" }, color: "white" }}
//             onClick={toggleDrawer(true)}
//           >
//             <MenuIcon />
//           </IconButton>
//         </Toolbar>
//       </AppBar>

//       {/* Drawer for Mobile */}
//       <Drawer
//         anchor="right"
//         open={open}
//         onClose={toggleDrawer(false)}
//         PaperProps={{
//           sx: {
//             width: { xs: "70%", sm: 300 }, // adaptive drawer width
//             bgcolor: "#1a1a1a",
//           },
//         }}
//       >
//         <Box
//           sx={{
//             height: "100%",
//             color: "white",
//             display: "flex",
//             flexDirection: "column",
//           }}
//         >
//           {/* Drawer Header */}
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "flex-end",
//               p: 2,
//             }}
//           >
//             <IconButton onClick={toggleDrawer(false)} sx={{ color: "white" }}>
//               <CloseIcon />
//             </IconButton>
//           </Box>

//           {/* Drawer Links */}
//           <List>
//             {navLinks.map((link) => (
//               <ListItem key={link.label} disablePadding>
//                 <ListItemButton
//                   component={Link}
//                   to={link.path}
//                   onClick={toggleDrawer(false)}
//                   sx={{
//                     color: "white",
//                     "&:hover": { bgcolor: "#333" },
//                   }}
//                 >
//                   <ListItemText
//                     primary={link.label}
//                     primaryTypographyProps={{
//                       fontSize: { xs: "0.9rem", sm: "1rem" },
//                       fontWeight: "bold",
//                     }}
//                   />
//                 </ListItemButton>
//               </ListItem>
//             ))}
//           </List>
//         </Box>
//       </Drawer>
//     </>
//   );
// };

// export default Navbar;

import { useState } from "react"; 
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText, } from "@mui/material"; 
import MenuIcon from "@mui/icons-material/Menu"; 
import CloseIcon from "@mui/icons-material/Close"; 
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => { 
  const [open, setOpen] = useState(false); 
  const navigate = useNavigate(); 
  const toggleDrawer = (state) => () => { setOpen(state); }; 
  const handleLogout = () => { localStorage.removeItem("token"); 
  localStorage.removeItem("userName"); navigate("/login"); }; 
 const isLoggedIn = Boolean(localStorage.getItem("token")); // ✅ check login status 
 const navLinks = [ { label: "About", path: "/about" }, 
  { label: "Lineage", path: "/lineage" }, 
  { label: "Family Gallery", path: "/gallery" }, 
  { label: "Family Events", path: "/events" }, ]; 
  
  return ( 
  <> 
  <AppBar position="sticky" elevation={6} sx={{ bgcolor: "#1a1a1a", width: "100%" }}> 
    <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", px: { xs: 2, sm: 3, md: 5 }, }} > 
  
  {/* Brand / Logo */} 
  <Typography variant="h6" fontWeight="bold" 
  sx={{ letterSpacing: 1, 
    fontSize: { xs: "1rem", sm: "1.2rem", md: "1.4rem" }, }} 
    component={Link} to="/home" 
    style={{ textDecoration: "none", color: "white" }} > 
    Nmelonye Family Legacy </Typography> 

    {/* Desktop Menu */} 
    <Box sx={{ display: { xs: "none", md: "flex" }, gap: { md: 2, lg: 3 } }}> 
      
      {navLinks.map((link) => ( 
        <Button key={link.label} color="inherit" 
        component={Link} to={link.path} sx={{ fontWeight: "bold", textTransform: "none", fontSize: { md: "0.95rem", lg: "1rem" }, ":hover": { bgcolor: "#333", borderRadius: 2 }, }} > 
        {link.label} 
        </Button> ))} 
        
        {/* ✅ Show Logout only if logged in */} 
        {isLoggedIn && ( 
          
          <Button color="inherit" 
          onClick={handleLogout} 
          sx={{ fontWeight: "bold", 
            textTransform: "none", 
            fontSize: { md: "0.95rem", lg: "1rem" }, 
            ":hover": { bgcolor: "#333", borderRadius: 2 }, }} >
               Logout 
               </Button> )} 
               </Box> 
               
               {/* Mobile Toggle */} 
               
               <IconButton sx={{ display: { xs: "flex", md: "none" }, color: "white" }} 
               onClick={toggleDrawer(true)} > 
               <MenuIcon /> 
               </IconButton> 
               </Toolbar> 
               </AppBar> 

               {/* Drawer for Mobile */} 
               
               <Drawer anchor="right" 
               open={open} onClose={toggleDrawer(false)} 
               PaperProps={{ sx: { width: { xs: "70%", sm: 300 }, 
               bgcolor: "#1a1a1a" }, }} > 
               <Box sx={{ height: "100%", 
               color: "white", 
               display: "flex", 
               flexDirection: "column", }} > 
               
               {/* Drawer Header */} 
               <Box sx={{ display: "flex", 
               justifyContent: "flex-end", p: 2 }}> 
               <IconButton onClick={toggleDrawer(false)} 
               sx={{ color: "white" }}> 
               <CloseIcon /> 
               </IconButton> 
               </Box> 
               {/* Drawer Links */} 
               <List> {navLinks.map((link) => ( 
                <ListItem key={link.label} 
                disablePadding> 
                <ListItemButton component={Link} to={link.path} 
                onClick={toggleDrawer(false)} 
                sx={{ color: "white", "&:hover": 
                  { bgcolor: "#333" } }} > 
                  <ListItemText primary={link.label} 
                  primaryTypographyProps={{ fontSize: { xs: "0.9rem", sm: "1rem" }, 
                  fontWeight: "bold", }} /> 
                  </ListItemButton> 
                  </ListItem> ))} 
                  {/* ✅ Mobile Logout only if logged in */} 
                  {isLoggedIn && ( 
                    <ListItem disablePadding> 
                    <ListItemButton onClick={() => { handleLogout(); 
                    toggleDrawer(false)(); }} sx={{ color: "white", 
                      "&:hover": { bgcolor: "#333" } }} > 
                      <ListItemText primary="Logout" 
                      primaryTypographyProps={{ fontSize: { xs: "0.9rem", sm: "1rem" }, 
                      fontWeight: "bold", }} /> </ListItemButton> </ListItem> )} 
                      </List> 
                      </Box> 
                      </Drawer> 
                      </> 
                      ); 
                      };
                       export default Navbar;
