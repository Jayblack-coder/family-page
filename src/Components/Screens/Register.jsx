import { useState } from "react";
import { Box, TextField, Button, Typography, Alert, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Setup axios instance with base URL from .env
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const allowedSurnames = ["Nwankwo", "Asouzu", "Udorji", "Okoli", "Anyaga"];

const Register = () => {
  const navigate = useNavigate();
  const [surname, setSurname] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [familyStatus, setFamilyStatus] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [parents, setParents] = useState("");
  const [generation, setGeneration] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [spouse, setSpouse] = useState("");
  const [cityOfResidence, setCityOfResidence] = useState("");
  const [offspring, setOffspring] = useState("");
  const [image, setImage] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!allowedSurnames.includes(surname.trim())) {
      setError("Surname not recognized. Please contact admin");
      setSuccess("");
      return;
    }
    setError("");

    try {
      // ✅ axios handles headers + JSON automatically
      const res = await API.post("/api/user/register", {
        surname,
        firstName,
        middleName,
        userName,
        password,
        parents,
        familyStatus,
        generation,
        dateOfBirth,
        spouse,
        cityOfResidence,
        offspring,
        image,
      });

      console.log(res.data);

      setSuccess("Registration Successful! Redirecting...");
      setError("");
      setTimeout(() => navigate("/home"), 2000);

      // Reset form
      setSurname("");
      setFirstName("");
      setMiddleName("");
      setFamilyStatus("");
      setUserName("");
      setPassword("");
      setParents("");
      setGeneration("");
      setDateOfBirth("");
      setSpouse("");
      setCityOfResidence("");
      setOffspring("");
      setImage("");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Registration failed. Please try again"
      );
      setSuccess("");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 400, mx: "auto", mt: 4 }}
    >
      <Typography variant="h5" mb={2}>
        Nmelonye Family <br /> Online Registration Form
      </Typography>
      <Stack spacing={2}>
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}

        <TextField
          label="Surname"
          name="surname"
          value={surname}
          onChange={(e) => {
            setSurname(e.target.value);
            setError("");
            setSuccess("");
          }}
          required
          error={!!error && !allowedSurnames.includes(surname.trim())}
          helperText={
            !!error && !allowedSurnames.includes(surname.trim())
              ? "Surname not recognized. Please contact admin"
              : ""
          }
        />
        <TextField
          label="First Name"
          name="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <TextField
          label="Middle Name"
          name="middleName"
          value={middleName}
          onChange={(e) => setMiddleName(e.target.value)}
        />
        <TextField
          label="Family Status"
          name="familyStatus"
          value={familyStatus}
          onChange={(e) => setFamilyStatus(e.target.value)}
          required
        />
        <TextField
          label="Username"
          name="userName"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <TextField
          label="Parents"
          name="parents"
          value={parents}
          onChange={(e) => setParents(e.target.value)}
          required
        />
        <TextField
          label="Generation"
          name="generation"
          value={generation}
          onChange={(e) => setGeneration(e.target.value)}
          required
        />
        <TextField
          label="Date of Birth"
          name="dateOfBirth"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
          required
        />
        <TextField
          label="Spouse"
          name="spouse"
          value={spouse}
          onChange={(e) => setSpouse(e.target.value)}
        />
        <TextField
          label="City of Residence"
          name="cityOfResidence"
          value={cityOfResidence}
          onChange={(e) => setCityOfResidence(e.target.value)}
          required
        />
        <TextField
          label="Offspring"
          name="offspring"
          value={offspring}
          onChange={(e) => setOffspring(e.target.value)}
        />
        <Button type="submit" variant="contained">
          Register
        </Button>
      </Stack>
    </Box>
  );
};

export default Register;
