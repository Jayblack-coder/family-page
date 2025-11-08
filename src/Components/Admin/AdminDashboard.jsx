import { useState } from "react";
import { Container, Typography, Box, Button, Stack } from "@mui/material";
import GalleryUpload from "./GalleryUpload";
import ProfilePictureUpdate from "./ProfilePictureUpdate";
import EventsManager from "./EventsManager";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("gallery");
const { logout } = useAuth();
  const renderContent = () => {
    switch (activeTab) {
      case "gallery":
        return <GalleryUpload />;
      case "profile":
        return <ProfilePictureUpdate />;
      case "events":
        return <EventsManager />;
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
          <Button variant="outlined" color="error" onClick={logout}>
  Logout
</Button>;
        </Stack>

        {renderContent()}
      </Container>
    </Box>
  );
};

export default AdminDashboard;
