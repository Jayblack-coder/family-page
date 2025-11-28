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
import { Box, Button, Typography, TextField, LinearProgress } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import API from "../Screens/api.jsx";

const GalleryUpload = () => {
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState(""); // New state for description
  const [uploading, setUploading] = useState(false);
  const { token } = useAuth();

  const uploadImage = async () => {
    if (!file) return toast.error("Please choose an image");

    const formData = new FormData();
    formData.append("image", file);
    formData.append("caption", caption); // send caption to backend

    try {
      setUploading(true);

      await API.post("/api/gallery/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });

      toast.success("Image uploaded!");
      setFile(null);
      setCaption(""); // reset caption

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

      <TextField
        label="Brief Description"
        fullWidth
        multiline
        rows={2}
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        sx={{ mb: 2 }}
      />

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


