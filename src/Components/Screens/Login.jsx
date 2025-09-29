import { useState } from "react";

import { Link, useNavigate } from "react-router-dom"; 
// import axios from "axios";
import API  from "./api";
import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { ClipLoader } from "react-spinners";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { InputAdornment, IconButton } from "@mui/material";

// Setup axios instance with base URL from .env
// const API = axios.create({
//   baseURL: import.meta.env.VITE_API_URL
// });

// const API = import.meta.env.VITE_API_URL 
// const Login_URL ='https://nmelonye-backend.onrender.com/api/user/login'

const Login = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // ✅ Correct Axios POST usage
      // const res = await axios.post(Login_URL, {
      //   userName,
      //   password,
      // });
const res = await API.post("api/user/login", { userName, password },
 { headers: { "Content-Type": "application/json" }}
);
      // console.log("API Base URL:", import.meta.env.VITE_API_URL);
      console.log("Login response:", res.data);

      if (res.status === 200) {
        setTimeout(() => navigate("/home"), 2000);
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to right, #8360c3, #2ebf91)",
        padding: 2,
      }}
    >
      <Card
        sx={{
          width: { xs: "100%", sm: "90%", md: "60%", lg: "40%" },
          borderRadius: 4,
          boxShadow: 10,
          bgcolor: "wheat",
        }}
      >
        <CardContent sx={{ p: { xs: 3, sm: 5 } }}>
          <Typography
            variant="h4"
            component="h1"
            align="center"
            gutterBottom
            sx={{ fontWeight: "bold", color: "#333" }}
          >
            Login Account
          </Typography>

          {error && (
            <Typography
              color="error"
              variant="body2"
              align="center"
              gutterBottom
            >
              {error}
            </Typography>
          )}

          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                width="100%"
              >
                <TextField
                  label="User Name"
                  type="text"
                  variant="outlined"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  fullWidth
                  required
                />
                <TextField
  label="Password"
  name="password"
  type={showPassword ? "text" : "password"}   // 👈 toggle password visibility
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
              </Stack>

              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
                sx={{
                  backgroundColor: "#4caf50",
                  color: "white",
                  fontWeight: "bold",
                  py: 1.5,
                  borderRadius: 2,
                  ":hover": { bgcolor: "#388e3c" },
                }}
              >
                {loading ? <ClipLoader size={20} color="white" /> : "Login"}
              </Button>

              <Typography sx={{ textAlign: "center" }}>
                Not Registered?{" "}
                <Link
                  to="/register"
                  style={{ textDecoration: "none", color: "#1976d2" }}
                >
                  Register Here
                </Link>
              </Typography>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
