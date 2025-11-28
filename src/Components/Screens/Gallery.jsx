import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Dialog,
  DialogContent,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAuth } from "../../context/AuthContext";
import API from "../Screens/api.jsx";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const { user, token } = useAuth();

  const isAdmin = user?.familyStatus?.toLowerCase() === "admin";

  const fetchImages = async () => {
    try {
      const res = await API.get("/api/gallery");
      setImages(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to load images", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
    const refresh = () => fetchImages();
    window.addEventListener("gallery-updated", refresh);
    return () => window.removeEventListener("gallery-updated", refresh);
  }, []);

  const deleteImage = async (id) => {
    if (!window.confirm("Delete this image?")) return;

    try {
      await API.delete(`/api/gallery/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setImages(images.filter((img) => img._id !== id));
    } catch (err) {
      console.error("Delete failed", err);
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
          sx={{ color: "#004aad", mb: 4 }}
        >
          Family Event Gallery
        </Typography>

        {loading ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={3}>
            {images.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item._id}>
                <Card
                  sx={{
                    borderRadius: 3,
                    overflow: "hidden",
                    boxShadow: 3,
                    cursor: "pointer",
                    transition: "transform 0.2s",
                    "&:hover": { transform: "scale(1.03)" },
                  }}
                >
                  <Box sx={{ position: "relative" }}>
                    <CardMedia
                      component="img"
                      height="220"
                      image={item.imageUrl}
                      alt={item.caption || "Family Event"}
                      onClick={() => setSelectedImage(item.imageUrl)}
                    />
                    {isAdmin && (
                      <IconButton
                        onClick={() => deleteImage(item._id)}
                        sx={{
                          position: "absolute",
                          top: 8,
                          right: 8,
                          bgcolor: "rgba(255,255,255,0.8)",
                          "&:hover": { bgcolor: "rgba(255,255,255,1)" },
                        }}
                      >
                        <DeleteIcon color="error" />
                      </IconButton>
                    )}
                  </Box>
                  {item.caption && (
                    <CardContent sx={{ bgcolor: "#f1f5f9" }}>
                      <Typography
                        variant="body1"
                        color="textPrimary"
                        sx={{ textAlign: "center" }}
                      >
                        {item.caption}
                      </Typography>
                    </CardContent>
                  )}
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Lightbox Viewer */}
        <Dialog open={Boolean(selectedImage)} onClose={() => setSelectedImage(null)} maxWidth="md" fullWidth>
          <DialogContent sx={{ p: 0 }}>
            <img src={selectedImage} alt="Full View" style={{ width: "100%", borderRadius: "8px" }} />
          </DialogContent>
        </Dialog>
      </Container>
    </Box>
  );
};

export default Gallery;

