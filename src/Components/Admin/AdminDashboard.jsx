// import { useState } from "react";
import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Stack,
  Paper,
} from "@mui/material";

import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EventIcon from "@mui/icons-material/Event";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LogoutIcon from "@mui/icons-material/Logout";
import GalleryUpload from "./GalleryUpload";
import ProfilePictureUpdate from "./ProfileUpdate.jsx";
import EventsManager from "./EventsManager.jsx";
import EventsCalendar from "./EventsCalendar.jsx";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import FamilyRecordsManager from "./FamilyRecordsManager.jsx";


const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("gallery");

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();

    toast.success("✅ Logged out successfully!");

    setTimeout(() => navigate("/login"), 1500);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "gallery":
        return <GalleryUpload />;

      case "profile":
        return <ProfilePictureUpdate />;

      case "events":
        return <EventsManager />;

      case "calendar":
        return <EventsCalendar />;

      case "records":
  return <FamilyRecordsManager />;

      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f4f7fb",
        py: { xs: 3, md: 5 },
        px: 2,
      }}
    >
      <Container maxWidth="xl">
        {/* HEADER */}
        <Paper
          elevation={3}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 4,
            mb: 4,
            background:
              "linear-gradient(135deg, #004aad 0%, #1976d2 100%)",
            color: "#fff",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{
              fontSize: {
                xs: "1.8rem",
                md: "2.5rem",
              },
            }}
          >
            Family Admin Dashboard
          </Typography>

          <Typography
            variant="body1"
            sx={{
              mt: 1,
              opacity: 0.9,
              fontSize: {
                xs: "0.95rem",
                md: "1rem",
              },
            }}
          >
            Manage family gallery, profiles, events, calendar updates, and family historical records.
          </Typography>
        </Paper>

        {/* NAVIGATION BUTTONS */}
        <Paper
          elevation={2}
          sx={{
            p: 2,
            borderRadius: 4,
            mb: 4,
            bgcolor: "#fff",
          }}
        >
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="center"
            alignItems="center"
            flexWrap="wrap"
          >
            <Button
              fullWidth
              startIcon={<PhotoLibraryIcon />}
              variant={activeTab === "gallery" ? "contained" : "outlined"}
              onClick={() => setActiveTab("gallery")}
              sx={{
                minWidth: 220,
                py: 1.3,
                borderRadius: 3,
                fontWeight: "bold",
              }}
            >
              Gallery Upload
            </Button>

            <Button
              fullWidth
              startIcon={<AccountCircleIcon />}
              variant={activeTab === "profile" ? "contained" : "outlined"}
              onClick={() => setActiveTab("profile")}
              sx={{
                minWidth: 220,
                py: 1.3,
                borderRadius: 3,
                fontWeight: "bold",
              }}
            >
              Profile Pictures
            </Button>

            <Button
              fullWidth
              startIcon={<EventIcon />}
              variant={activeTab === "events" ? "contained" : "outlined"}
              onClick={() => setActiveTab("events")}
              sx={{
                minWidth: 220,
                py: 1.3,
                borderRadius: 3,
                fontWeight: "bold",
              }}
            >
              Post Events
            </Button>

            <Button
              fullWidth
              startIcon={<CalendarMonthIcon />}
              variant={activeTab === "calendar" ? "contained" : "outlined"}
              onClick={() => setActiveTab("calendar")}
              sx={{
                minWidth: 220,
                py: 1.3,
                borderRadius: 3,
                fontWeight: "bold",
              }}
            >
              Calendar View
            </Button>
<Button
  fullWidth
  startIcon={<HistoryEduIcon />}
  variant={activeTab === "records" ? "contained" : "outlined"}
  onClick={() => setActiveTab("records")}
  sx={{
    minWidth: 220,
    py: 1.3,
    borderRadius: 3,
    fontWeight: "bold",
    bgcolor:
      activeTab === "records"
        ? "#6A1B9A"
        : "transparent",
    borderColor: "#6A1B9A",
    color:
      activeTab === "records"
        ? "#fff"
        : "#6A1B9A",
  }}
>
  Family Records
</Button>
            <Button
              fullWidth
              startIcon={<LogoutIcon />}
              variant="contained"
              color="error"
              onClick={handleLogout}
              sx={{
                minWidth: 220,
                py: 1.3,
                borderRadius: 3,
                fontWeight: "bold",
              }}
            >
              Logout
            </Button>
          </Stack>
        </Paper>

        {/* MAIN CONTENT */}
        <Paper
          elevation={2}
          sx={{
            p: { xs: 2, md: 4 },
            borderRadius: 4,
            bgcolor: "#fff",
            minHeight: "500px",
            overflowX: "auto",
          }}
        >
          {renderContent()}
        </Paper>
      </Container>
    </Box>
  );
};

export default AdminDashboard;