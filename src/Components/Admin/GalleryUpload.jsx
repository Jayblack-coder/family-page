// import { useState } from "react";
// import { Box, Button, Typography, TextField, Grid, Card, CardMedia } from "@mui/material";
// import API from "../Screens/api.jsx";

// const GalleryUpload = () => {
//   const [image, setImage] = useState(null);
//   const [caption, setCaption] = useState("");
//   const [gallery, setGallery] = useState([]);

//   const handleUpload = async () => {
//     if (!image) return alert("Please select an image.");

//     const formData = new FormData();
//     formData.append("image", image);
//     formData.append("caption", caption);

//     try {
//       const res = await API.post("/api/gallery/upload", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       alert("Image uploaded successfully!");
//       setGallery([...gallery, res.data]);
//       setImage(null);
//       setCaption("");
//     } catch (err) {
//       console.error("Upload failed:", err);
//     }
//   };

//   return (
//     <Box>
//       <Typography variant="h5" fontWeight="bold" gutterBottom>
//         Upload to Family Gallery
//       </Typography>

//       <Box mb={3}>
//         <input
//           type="file"
//           accept="image/*"
//           onChange={(e) => setImage(e.target.files[0])}
//           style={{ marginBottom: "1rem" }}
//         />
//         <TextField
//           label="Caption"
//           fullWidth
//           value={caption}
//           onChange={(e) => setCaption(e.target.value)}
//           sx={{ mb: 2 }}
//         />
//         <Button variant="contained" onClick={handleUpload}>
//           Upload
//         </Button>
//       </Box>

//       {/* Display Gallery */}
//       <Grid container spacing={2}>
//         {gallery.map((img, i) => (
//           <Grid item xs={12} sm={6} md={4} key={i}>
//             <Card>
//               <CardMedia
//                 component="img"
//                 height="250"
//                 image={img.url}
//                 alt={img.caption}
//               />
//               <Typography textAlign="center" sx={{ p: 1 }}>
//                 {img.caption}
//               </Typography>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// };

// export default GalleryUpload;
import React, { useState } from "react";
import { Box, Button, Typography, LinearProgress } from "@mui/material";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

const GalleryUpload = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const { token } = useAuth();

  const uploadImage = async () => {
    if (!file) return toast.error("Please choose an image");

    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);

      await axios.post(
        "/api/gallery/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // toast.success("Image uploaded!");
      // setFile(null);
      toast.success("Image uploaded!");
setFile(null);

// FORCE gallery to update for admin view
window.dispatchEvent(new Event("gallery-updated"));

    } catch (err) {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box sx={{ p: 3, bgcolor: "white", borderRadius: 3, boxShadow: 1 }}>
      <Typography variant="h6" mb={2}>
        Upload Family Event Picture
      </Typography>

      <input type="file" onChange={(e) => setFile(e.target.files[0])} />

      {uploading && <LinearProgress sx={{ mt: 2 }} />}

      <Button
        variant="contained"
        sx={{ mt: 2 }}
        onClick={uploadImage}
        disabled={!file}
      >
        Upload
      </Button>
    </Box>
  );
};

export default GalleryUpload;

