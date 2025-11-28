// import React, { useState } from "react";
// import { Box, Button, Typography, LinearProgress } from "@mui/material";
// import { useAuth } from "../../context/AuthContext";
// import { toast } from "react-toastify";
// import API from "../Screens/api.jsx";

// const GalleryUpload = () => {
//   const [file, setFile] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const { token } = useAuth();

//   const uploadImage = async () => {
//     if (!file) return toast.error("Please choose an image");

//     const formData = new FormData();
//     formData.append("image", file);

//     try {
//       setUploading(true);

      
// await API.post("/api/gallery/upload", formData, {
//   headers: {
//     Authorization: `Bearer ${token}`,
//     "Content-Type": "multipart/form-data"
//   }
// });


//       toast.success("Image uploaded!");
//       setFile(null);

//       // refresh gallery page
//       window.dispatchEvent(new Event("gallery-updated"));
//     } catch (err) {
//       console.error(err);
//       toast.error("Upload failed");
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <Box sx={{ p: 3, bgcolor: "white", borderRadius: 3, boxShadow: 1 }}>
//       <Typography variant="h6" mb={2}>
//         Upload Family Event Picture
//       </Typography>

//       <input type="file" onChange={(e) => setFile(e.target.files[0])} />

//       {uploading && <LinearProgress sx={{ mt: 2 }} />}

//       <Button
//         variant="contained"
//         sx={{ mt: 2 }}
//         onClick={uploadImage}
//         disabled={!file}
//       >
//         Upload
//       </Button>
//     </Box>
//   );
// };

// export default GalleryUpload;

import React, { useState } from "react";
import { Box, Button, Typography, LinearProgress, TextField } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import API from "../Screens/api.jsx";

const GalleryUpload = () => {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const { token } = useAuth();

  const uploadImage = async () => {
    if (!file) return toast.error("Please choose an image");
    if (!description.trim()) return toast.error("Please add a brief description");

    const formData = new FormData();
    formData.append("image", file);
    formData.append("description", description);

    try {
      setUploading(true);

      await API.post("/api/gallery/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Image uploaded!");
      setFile(null);
      setDescription("");

      // refresh gallery page
      window.dispatchEvent(new Event("gallery-updated"));
    } catch (err) {
      console.error(err);
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

      {/* Image Picker */}
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />

      {/* Description Input */}
      <TextField
        fullWidth
        label="Image Description"
        placeholder="Add a short caption or description..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        sx={{ mt: 2 }}
      />

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

