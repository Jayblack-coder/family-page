import { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Stack,
  MenuItem,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { ClipLoader } from "react-spinners";
import API from "./api.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

const MyProfile = () => {
  const { user, updateUser } = useAuth();
  const [surname, setSurname] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [familyStatus, setFamilyStatus] = useState("");
  const [parents, setParents] = useState("");
  const [generation, setGeneration] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [spouse, setSpouse] = useState("");
  const [cityOfResidence, setCityOfResidence] = useState("");
  const [offspring, setOffspring] = useState([""]);
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!user) return;

    setSurname(user.surname || "");
    setFirstName(user.firstName || "");
    setMiddleName(user.middleName || "");
    setFamilyStatus(user.familyStatus || "");
    setParents(user.parents || "");
    setGeneration(user.generation || "");
    setDateOfBirth(user.dateOfBirth ? dayjs(user.dateOfBirth) : null);
    setSpouse(user.spouse || "");
    setCityOfResidence(user.cityOfResidence || "");
    setOffspring(
      Array.isArray(user.offspring) && user.offspring.length > 0
        ? user.offspring
        : [""]
    );
    setPreview(user.image || "");
     console.log("Logged in user:", user);
  }, [user]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const payload = {
        surname,
        firstName,
        middleName,
        familyStatus,
        parents,
        generation,
        dateOfBirth: dateOfBirth ? dateOfBirth.format("YYYY-MM-DD") : "",
        spouse,
        cityOfResidence,
        offspring: offspring.filter((name) => name.trim() !== ""),
      };

      const res = await API.put(`/api/user/${user.id}`, payload, {
        headers: { "Content-Type": "application/json" },
      });

      const updated = res.data;
      const updatedAuthUser = {
        id: updated._id,
        surname: updated.surname,
        firstName: updated.firstName,
        middleName: updated.middleName,
        familyStatus: updated.familyStatus,
        userName: updated.userName,
        parents: updated.parents,
        generation: updated.generation,
        dateOfBirth: updated.dateOfBirth,
        spouse: updated.spouse,
        cityOfResidence: updated.cityOfResidence,
        offspring: updated.offspring,
        image: updated.image,
        isAdmin: updated.isAdmin,
      };

      updateUser(updatedAuthUser);
      setSuccess("Profile updated successfully.");
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || err.response?.data?.error || "Update failed."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleUploadPhoto = async (file) => {
    if (!file || !user) return;
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await API.post(`/api/user/${user.id}/uploadPhoto`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const updated = res.data.user;
      const updatedAuthUser = {
        id: updated._id,
        surname: updated.surname,
        firstName: updated.firstName,
        middleName: updated.middleName,
        familyStatus: updated.familyStatus,
        userName: updated.userName,
        parents: updated.parents,
        generation: updated.generation,
        dateOfBirth: updated.dateOfBirth,
        spouse: updated.spouse,
        cityOfResidence: updated.cityOfResidence,
        offspring: updated.offspring,
        image: updated.image,
        isAdmin: updated.isAdmin,
      };

      updateUser(updatedAuthUser);
      setPreview(updated.image || "");
      setImageFile(null);
      setSuccess("Profile picture updated successfully.");
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || err.response?.data?.error || "Image upload failed."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleOffspringChange = (index, value) => {
    const newOffspring = [...offspring];
    newOffspring[index] = value;
    setOffspring(newOffspring);
  };

  const addOffspring = () => setOffspring([...offspring, ""]);

  const removeOffspring = (index) => {
    const newOffspring = offspring.filter((_, i) => i !== index);
    setOffspring(newOffspring.length ? newOffspring : [""]);
  };

  return (
    <Box
      sx={{
        width: "100vw",
        // minHeight: "100vh",
        pt: "100px",
        pb: 5,
        backgroundColor: "#f3f6fb",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        overflowY: "auto",
      }}
    >
      <Card
        sx={{
          width: { xs: "95%", sm: "90%", md: "80%", lg: "70%" },
          backgroundColor: "#fff",
          borderRadius: 4,
          boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
          p: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <CardContent>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            My Profile
          </Typography>

          {error && <Alert severity="error">{error}</Alert>}
          {success && <Alert severity="success">{success}</Alert>}

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Stack spacing={2}>
              <TextField
                label="Surname"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                required
              />
              <TextField
                label="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <TextField
                label="Middle Name"
                value={middleName}
                onChange={(e) => setMiddleName(e.target.value)}
              />
              <TextField
                select
                label="Family Status"
                value={familyStatus}
                onChange={(e) => setFamilyStatus(e.target.value)}
                required
                fullWidth
              >
                <MenuItem value="Son">Son</MenuItem>
                <MenuItem value="Daughter">Daughter</MenuItem>
                <MenuItem value="Wife">Wife</MenuItem>
              </TextField>
              <TextField label="Username" value={user?.userName || ""} disabled />
              <TextField
                label="Parents"
                value={parents}
                onChange={(e) => setParents(e.target.value)}
                required
              />
              <TextField
                select
                label="Generation"
                value={generation}
                onChange={(e) => setGeneration(e.target.value)}
                required
                fullWidth
              >
                <MenuItem value="1st">1st</MenuItem>
                <MenuItem value="2nd">2nd</MenuItem>
                <MenuItem value="3rd">3rd</MenuItem>
                <MenuItem value="4th">4th</MenuItem>
                <MenuItem value="5th">5th</MenuItem>
              </TextField>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date of Birth"
                  value={dateOfBirth}
                  onChange={(newValue) => setDateOfBirth(newValue)}
                  disableFuture
                  slotProps={{ textField: { fullWidth: true, required: true } }}
                />
              </LocalizationProvider>

              <TextField
                label="Spouse"
                value={spouse}
                onChange={(e) => setSpouse(e.target.value)}
              />
              <TextField
                label="City of Residence"
                value={cityOfResidence}
                onChange={(e) => setCityOfResidence(e.target.value)}
                required
              />

              <Typography variant="subtitle1" fontWeight="bold">
                Offspring
              </Typography>
              {offspring.map((child, index) => (
                <Stack key={index} direction="row" spacing={1} alignItems="center">
                  <TextField
                    fullWidth
                    label={`Offspring ${index + 1}`}
                    value={child}
                    onChange={(e) => handleOffspringChange(index, e.target.value)}
                  />
                  {index > 0 && (
                    <Button color="error" onClick={() => removeOffspring(index)}>
                      Remove
                    </Button>
                  )}
                </Stack>
              ))}
              <Button variant="outlined" onClick={addOffspring}>
                + Add Offspring
              </Button>

              <Button
                type="submit"
                variant="contained"
                sx={{ backgroundColor: "#0E63D3", color: "white", py: 1.5 }}
              >
                Save Profile
              </Button>
            </Stack>
          </Box>

          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Profile Picture
            </Typography>
            <Box sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", sm: "row" } }}>
              <Card sx={{ width: { xs: "100%", sm: 280 }, textAlign: "center" }}>
                <CardMedia
                  component="img"
                  height="280"
                  image={preview || "https://via.placeholder.com/280"}
                  alt="Profile preview"
                />
              </Card>
              <Box sx={{ flex: 1 }}>
                <Button component="label" variant="outlined" fullWidth>
                  Choose Picture
                  <input
                    hidden
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setImageFile(file);
                        setPreview(URL.createObjectURL(file));
                      }
                    }}
                  />
                </Button>
                {imageFile && (
                  <Button
                    variant="contained"
                    sx={{ mt: 2, backgroundColor: "#0E63D3", color: "white" }}
                    onClick={() => handleUploadPhoto(imageFile)}
                  >
                    Upload Picture
                  </Button>
                )}
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {loading && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <ClipLoader color="#ffffff" size={80} />
        </Box>
      )}
    </Box>
  );
};

export default MyProfile;
