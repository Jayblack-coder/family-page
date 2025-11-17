import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  ImageList,
  ImageListItem,
  IconButton,
  Dialog,
  DialogContent,
  CircularProgress
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const { user, token } = useAuth();

  const isAdmin = user?.familyStatus?.toLowerCase() === "admin";

  // Load images from backend
  const fetchImages = async () => {
    try {
      const res = await axios.get("https://your-backend.com/api/gallery");
      setImages(res.data);
    } catch (err) {
      console.error("Failed to load images", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const deleteImage = async (id) => {
    if (!window.confirm("Delete this image?")) return;

    try {
      await axios.delete(`https://your-backend.com/api/gallery/${id}`, {
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
          sx={{ color: "#004aad", mb: 3 }}
        >
          Family Event Gallery
        </Typography>

        {loading ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : (
          <ImageList variant="masonry" cols={3} gap={16}>
            {images.map((item) => (
              <Box key={item._id} sx={{ position: "relative" }}>
                <ImageListItem>
                  <img
                    src={item.url}
                    alt="Family Event"
                    loading="lazy"
                    onClick={() => setSelectedImage(item.url)}
                    style={{
                      borderRadius: "12px",
                      cursor: "pointer",
                    }}
                  />
                </ImageListItem>

                {isAdmin && (
                  <IconButton
                    onClick={() => deleteImage(item._id)}
                    sx={{
                      position: "absolute",
                      top: 5,
                      right: 5,
                      bgcolor: "rgba(255,255,255,0.8)",
                    }}
                  >
                    <DeleteIcon color="error" />
                  </IconButton>
                )}
              </Box>
            ))}
          </ImageList>
        )}

        {/* Lightbox Viewer */}
        <Dialog open={Boolean(selectedImage)} onClose={() => setSelectedImage(null)}>
          <DialogContent>
            <img src={selectedImage} alt="Full View" style={{ width: "100%" }} />
          </DialogContent>
        </Dialog>
      </Container>
    </Box>
  );
};

export default Gallery;
