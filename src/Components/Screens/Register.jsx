

// import { useState } from "react";
// import {
//   Box,
//   TextField,
//   Button,
//   Typography,
//   Alert,
//   Stack,
//   MenuItem,
//   IconButton,
//   InputAdornment,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import API from "./api.jsx";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { Visibility, VisibilityOff } from "@mui/icons-material";

// const allowedSurnames = ["Nwankwo", "Asouzu", "Udorji", "Okoli", "Anyaga"];

// const Register = () => {
//   const navigate = useNavigate();
//   const [surname, setSurname] = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [middleName, setMiddleName] = useState("");
//   const [familyStatus, setFamilyStatus] = useState("");
//   const [userName, setUserName] = useState("");
//   const [password, setPassword] = useState("");
//   const [parents, setParents] = useState("");
//   const [generation, setGeneration] = useState("");
//   const [dateOfBirth, setDateOfBirth] = useState(null);
//   const [spouse, setSpouse] = useState("");
//   const [cityOfResidence, setCityOfResidence] = useState("");
//   const [offspring, setOffspring] = useState([""]);
//  // const [offspring, setOffspring] = useState("");
//   const [image, setImage] = useState(null); // ✅ new state for image
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!allowedSurnames.includes(surname.trim())) {
//       setError("Surname not recognized. Please contact admin");
//       setSuccess("");
//       return;
//     }
//     setError("");

//     try {
//       // ✅ Use FormData to send file + text fields
//       const formData = new FormData();
//       formData.append("surname", surname);
//       formData.append("firstName", firstName);
//       formData.append("middleName", middleName);
//       formData.append("userName", userName);
//       formData.append("password", password);
//       formData.append("parents", parents);
//       formData.append("familyStatus", familyStatus);
//       formData.append("generation", generation);
//       formData.append("dateOfBirth", dateOfBirth ? dateOfBirth.format("YYYY-MM-DD") : "");
//       formData.append("spouse", spouse);
//       formData.append("cityOfResidence", cityOfResidence);
//       formData.append("offspring", JSON.stringify(offspring.filter(name => name.trim() !== "")));

//       // formData.append("offspring", offspring);
//       if (image) formData.append("image", image);

//       const res = await API.post("api/user/register", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       console.log(res.data);
//       setSuccess("Registration Successful! Redirecting...");
//       setError("");
//       setTimeout(() => navigate("/home"), 2000);

//       // Reset form
//       setSurname("");
//       setFirstName("");
//       setMiddleName("");
//       setFamilyStatus("");
//       setUserName("");
//       setPassword("");
//       setParents("");
//       setGeneration("");
//       setDateOfBirth(null);
//       setSpouse("");
//       setCityOfResidence("");
//       setOffspring("");
//       setImage(null);
//     } catch (err) {
//       setError(
//         err.response?.data?.message ||
//           err.response?.data?.error ||
//           "Registration failed. Please try again"
//       );
//       setSuccess("");
//     }
//   };

//   return (
//     <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
//       <Typography variant="h5" mb={2}>
//         Nmelonye Family <br /> Online Registration Form
//       </Typography>
//       <Stack spacing={2}>
//         {error && <Alert severity="error">{error}</Alert>}
//         {success && <Alert severity="success">{success}</Alert>}

//         {/* Other input fields... */}
        
//          <TextField
//           label="Surname"
//           name="surname"
//           value={surname}
//           onChange={(e) => {
//             setSurname(e.target.value);
//             setError("");
//             setSuccess("");
//           }}
//           required
//           error={!!error && !allowedSurnames.includes(surname.trim())}
//           helperText={
//             !!error && !allowedSurnames.includes(surname.trim())
//               ? "Surname not recognized. Please contact admin"
//               : ""
//           }
//         />
//         <TextField
//           label="First Name"
//           name="firstName"
//           value={firstName}
//           onChange={(e) => setFirstName(e.target.value)}
//           required
//         />
//         <TextField
//           label="Middle Name"
//           name="middleName"
//           value={middleName}
//           onChange={(e) => setMiddleName(e.target.value)}
//         />
//          <TextField
//           select
//           label="Family Status"
//           name="familyStatus"
//           value={familyStatus}
//           onChange={(e) => setFamilyStatus(e.target.value)}
//           required
//           fullWidth
//         >
//           <MenuItem value="Son">Son</MenuItem>
//           <MenuItem value="Daughter">Daughter</MenuItem>
//           <MenuItem value="Wife">Wife</MenuItem>
//         </TextField>
//         <TextField
//           label="Username"
//           name="userName"
//           value={userName}
//           onChange={(e) => setUserName(e.target.value)}
//           required
//         />
//         <TextField
//   label="Password"
//   name="password"
//   type={showPassword ? "text" : "password"}
//   value={password}
//   onChange={(e) => setPassword(e.target.value)}
//   required
//   InputProps={{
//     endAdornment: (
//       <InputAdornment position="end">
//         <IconButton
//           onClick={() => setShowPassword(!showPassword)}
//           edge="end"
//         >
//           {showPassword ? <VisibilityOff /> : <Visibility />}
//         </IconButton>
//       </InputAdornment>
//     ),
//   }}
// />

//         <TextField
//           label="Parents"
//           name="parents"
//           value={parents}
//           onChange={(e) => setParents(e.target.value)}
//           required
//         />
//         <TextField
//           select
//           label="Generation"
//           name="generation"
//           value={generation}
//           onChange={(e) => setGeneration(e.target.value)}
//           required
//           fullWidth
//         >
//           <MenuItem value="1st">1st</MenuItem>
//           <MenuItem value="2nd">2nd</MenuItem>
//           <MenuItem value="3rd">3rd</MenuItem>
//           <MenuItem value="4th">4th</MenuItem>
//           <MenuItem value="5th">5th</MenuItem>
//         </TextField>
//        <LocalizationProvider dateAdapter={AdapterDayjs}>
//   <DatePicker
//     label="Date of Birth"
//     value={dateOfBirth}
//     onChange={(newValue) => setDateOfBirth(newValue)}
//     disableFuture   // ✅ prevents selecting future dates
//     slotProps={{ textField: { fullWidth: true, required: true } }}
//   />
// </LocalizationProvider>


//         <TextField
//           label="Spouse"
//           name="spouse"
//           value={spouse}
//           onChange={(e) => setSpouse(e.target.value)}
//         />
//         <TextField
//           label="City of Residence"
//           name="cityOfResidence"
//           value={cityOfResidence}
//           onChange={(e) => setCityOfResidence(e.target.value)}
//           required
//         />
//         <Typography variant="subtitle1" fontWeight="bold">
//   Offspring
// </Typography>

// {offspring.map((child, index) => (
//   <Box key={index} sx={{ display: "flex", alignItems: "center", mb: 1 }}>
//     <TextField
//       fullWidth
//       label={`Offspring ${index + 1}`}
//       value={child}
//       onChange={(e) => {
//         const newList = [...offspring];
//         newList[index] = e.target.value;
//         setOffspring(newList);
//       }}
//     />
//     {index > 0 && (
//       <Button
//         color="error"
//         onClick={() => {
//           const newList = offspring.filter((_, i) => i !== index);
//           setOffspring(newList);
//         }}
//         sx={{ ml: 1 }}
//       >
//         Remove
//       </Button>
//     )}
//   </Box>
// ))}

// <Button
//   variant="outlined"
//   onClick={() => setOffspring([...offspring, ""])}
// >
//   + Add Offspring
// </Button>

//         {/* <TextField
//           label="Offspring"
//           name="offspring"
//           value={offspring}
//           onChange={(e) => setOffspring(e.target.value)}
//         /> */}

//         <TextField
//           type="file"
//           label="Upload Profile Image"
//           accept="image/*"
//           onChange={(e) => setImage(e.target.files[0])}
//           InputLabelProps={{ shrink: true }}
//           fullWidth
//         />

//         {image && (
//           <Box sx={{ textAlign: "center" }}>
//             <img
//               src={URL.createObjectURL(image)}
//               alt="Preview"
//               style={{ marginTop: "10px", maxHeight: "150px", borderRadius: "8px" }}
//             />
//           </Box>
//         )}

//         <Button type="submit" variant="contained">
//           Register
//         </Button>
//       </Stack>
//     </Box>
//   );
// };

// export default Register;

import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Stack,
  MenuItem,
  IconButton,
  InputAdornment,
  Card,
  CardContent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import API from "./api.jsx";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import tree from "../../assets/tree.jpg"; // ✅ same background as login

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
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [spouse, setSpouse] = useState("");
  const [cityOfResidence, setCityOfResidence] = useState("");
  const [offspring, setOffspring] = useState([""]);
  const [image, setImage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
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
      const formData = new FormData();
      formData.append("surname", surname);
      formData.append("firstName", firstName);
      formData.append("middleName", middleName);
      formData.append("userName", userName);
      formData.append("password", password);
      formData.append("parents", parents);
      formData.append("familyStatus", familyStatus);
      formData.append("generation", generation);
      formData.append(
        "dateOfBirth",
        dateOfBirth ? dateOfBirth.format("YYYY-MM-DD") : ""
      );
      formData.append("spouse", spouse);
      formData.append("cityOfResidence", cityOfResidence);
      formData.append(
        "offspring",
        JSON.stringify(offspring.filter((name) => name.trim() !== ""))
      );

      if (image) formData.append("image", image);

      const res = await API.post("api/user/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
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
      setDateOfBirth(null);
      setSpouse("");
      setCityOfResidence("");
      setOffspring([""]);
      setImage(null);
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
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${tree})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Poppins', sans-serif",
        overflowY: "auto",
        py: 5,
      }}
    >
      <Card
        sx={{
          height: "80px" ,
          width: { xs: "90%", sm: "80%", md: "60%", lg: "45%" },
          backgroundColor: "rgba(255, 255, 255, 0.92)",
          borderRadius: 4,
          boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
          backdropFilter: "blur(6px)",
        }}
      >
        <CardContent sx={{ p: { xs: 3, sm: 5 } }}>
          <Typography
            variant="h4"
            align="center"
            fontWeight="bold"
            color="#0E63D3"
            gutterBottom
          >
            Nmelonye Family Registration
          </Typography>

          {error && <Alert severity="error">{error}</Alert>}
          {success && <Alert severity="success">{success}</Alert>}

          <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400,  mx: "auto", mt: 12, p: 2  }}>
            <Stack spacing={2}>
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
                select
                label="Family Status"
                name="familyStatus"
                value={familyStatus}
                onChange={(e) => setFamilyStatus(e.target.value)}
                required
                fullWidth
              >
                <MenuItem value="Son">Son</MenuItem>
                <MenuItem value="Daughter">Daughter</MenuItem>
                <MenuItem value="Wife">Wife</MenuItem>
              </TextField>
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
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                label="Parents"
                name="parents"
                value={parents}
                onChange={(e) => setParents(e.target.value)}
                required
              />
              <TextField
                select
                label="Generation"
                name="generation"
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
                  slotProps={{
                    textField: { fullWidth: true, required: true },
                  }}
                />
              </LocalizationProvider>

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

              <Typography variant="subtitle1" fontWeight="bold">
                Offspring
              </Typography>
              {offspring.map((child, index) => (
                <Box
                  key={index}
                  sx={{ display: "flex", alignItems: "center", mb: 1 }}
                >
                  <TextField
                    fullWidth
                    label={`Offspring ${index + 1}`}
                    value={child}
                    onChange={(e) => {
                      const newList = [...offspring];
                      newList[index] = e.target.value;
                      setOffspring(newList);
                    }}
                  />
                  {index > 0 && (
                    <Button
                      color="error"
                      onClick={() => {
                        const newList = offspring.filter(
                          (_, i) => i !== index
                        );
                        setOffspring(newList);
                      }}
                      sx={{ ml: 1 }}
                    >
                      Remove
                    </Button>
                  )}
                </Box>
              ))}

              <Button
                variant="outlined"
                onClick={() => setOffspring([...offspring, ""])}
              >
                + Add Offspring
              </Button>

              <TextField
                type="file"
                label="Upload Profile Image"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
              {image && (
                <Box sx={{ textAlign: "center" }}>
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Preview"
                    style={{
                      marginTop: "10px",
                      maxHeight: "150px",
                      borderRadius: "8px",
                    }}
                  />
                </Box>
              )}

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: "#0E63D3",
                  color: "white",
                  fontWeight: "bold",
                  py: 1.3,
                  borderRadius: 3,
                  fontSize: "1rem",
                  mt: 2,
                  ":hover": { bgcolor: "#094a9f" },
                }}
              >
                Register
              </Button>
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Register;
