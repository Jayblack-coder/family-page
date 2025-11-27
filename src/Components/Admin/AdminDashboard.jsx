import { useState } from "react";
import { Container, Typography, Box, Button, Stack } from "@mui/material";
import GalleryUpload from "./GalleryUpload";
import ProfilePictureUpdate from "./ProfileUpdate.jsx";
import EventsManager from "./EventsManager.jsx";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom"; // ✅ import navigate
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("gallery");
  const { logout } = useAuth();
  const navigate = useNavigate(); // ✅ initialize navigate

   const handleLogout = () => {
    logout();
    toast.success("✅ You’ve been logged out successfully!");
    setTimeout(() => navigate("/login"), 2000); // redirect after 2 seconds
  };

  // const handleLogout = () => {
  //   logout(); // clears user + token
  //   navigate("/login"); // ✅ redirect to login page
  // };

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
        case "calendar":
        return <CalendarView />;

      default:
        return null;
    }
  };

  return (
    <Box sx={{ bgcolor: "#f5f5f5", minHeight: "100vh", py: 5 }}>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          fontWeight="bold"
          textAlign="center"
          gutterBottom
          sx={{ color: "#004aad", mb: 3 }}
        >
          Family Admin Dashboard
        </Typography>

        <Stack direction="row" justifyContent="center" spacing={2} mb={4}>
          <Button
            variant={activeTab === "gallery" ? "contained" : "outlined"}
            onClick={() => setActiveTab("gallery")}
          >
            Gallery Upload
          </Button>
          <Button
            variant={activeTab === "profile" ? "contained" : "outlined"}
            onClick={() => setActiveTab("profile")}
          >
            Update Profile Pictures
          </Button>
          <Button
            variant={activeTab === "events" ? "contained" : "outlined"}
            onClick={() => setActiveTab("events")}
          >
            Post Events
          </Button>
          <Button
  variant={activeTab === "calendar" ? "contained" : "outlined"}
  onClick={() => setActiveTab("calendar")}
>
  Calendar View
</Button>
<Button
  variant={activeTab === "calendar" ? "contained" : "outlined"}
  onClick={() => setActiveTab("calendar")}
>
  Calendar
</Button>


          <Button variant="outlined" color="error" onClick={handleLogout}>
            Logout
          </Button>
        </Stack>

        {renderContent()}
      </Container>
    </Box>
  );
};

export default AdminDashboard;
