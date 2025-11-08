import { useState } from "react";
import { Box, Button, Typography, TextField, Grid, Card, CardMedia } from "@mui/material";
import API from "./api.jsx";

const GalleryUpload = () => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [gallery, setGallery] = useState([]);

  const handleUpload = async () => {
    if (!image) return alert("Please select an image.");

    const formData = new FormData();
    formData.append("image", image);
    formData.append("caption", caption);

    try {
      const res = await API.post("/api/gallery/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Image uploaded successfully!");
      setGallery([...gallery, res.data]);
      setImage(null);
      setCaption("");
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  return (
    <Box>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Upload to Family Gallery
      </Typography>

      <Box mb={3}>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          style={{ marginBottom: "1rem" }}
        />
        <TextField
          label="Caption"
          fullWidth
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button variant="contained" onClick={handleUpload}>
          Upload
        </Button>
      </Box>

      {/* Display Gallery */}
      <Grid container spacing={2}>
        {gallery.map((img, i) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <Card>
              <CardMedia
                component="img"
                height="250"
                image={img.url}
                alt={img.caption}
              />
              <Typography textAlign="center" sx={{ p: 1 }}>
                {img.caption}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default GalleryUpload;
