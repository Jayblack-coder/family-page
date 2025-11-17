import React from "react";
import { Container, Typography, Box } from "@mui/material";
import GalleryUpload from "../Admin/GalleryUpload"; // <-- make sure this path is correct

const Gallery = () => {
  return (
    <Box sx={{ bgcolor: "#f5f5f5", minHeight: "100vh", py: 5 }}>
      <Container maxWidth="md">
        <Typography
          variant="h4"
          fontWeight="bold"
          textAlign="center"
          gutterBottom
          sx={{ color: "#004aad", mb: 3 }}
        >
          Family Event Gallery
        </Typography>

        {/* Reuse the upload component */}
        <GalleryUpload />
      </Container>
    </Box>
  );
};

export default Gallery;
