import { useState, useEffect } from "react";
import { Box, Typography, Grid, Button, Card, CardMedia } from "@mui/material";
import API from "../Screens/api.jsx";

const ProfilePictureUpdate = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    API.get("/api/user")
      .then((res) => {
        setUsers(res.data.users || res.data || []);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleUpload = async (userId, file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      await API.post(`/api/user/${userId}/uploadPhoto`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Profile picture updated!");
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  return (
    <Box>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Update Family Member Profile Pictures
      </Typography>

      <Grid container spacing={2}>
        {users.map((user) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={user._id}>
            <Card sx={{ p: 2, textAlign: "center" }}>
              <CardMedia
                component="img"
                height="200"
                image={user.image || "https://via.placeholder.com/200"}
                alt={user.firstName}
                sx={{ borderRadius: 2 }}
              />
              <Typography fontWeight="bold" mt={1}>
                {user.firstName} {user.surname}
              </Typography>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleUpload(user._id, e.target.files[0])}
                style={{ marginTop: "10px" }}
              />
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProfilePictureUpdate;
