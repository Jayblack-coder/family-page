import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
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

const API_URL = import.meta.env.VITE_API_URLL;
const LOGIN_URL = `${API_URL}/register/login`;

const Login = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  // const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    // setSuccess("");
    setLoading(true);

    try {
      const res = await axios.post(LOGIN_URL, { userName, password });
      console.log(res);
      if (res.status === 200) {
        // setSuccess("Login successful! Redirecting...");
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
              {/* Responsive fields */}
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
                  type="password"
                  variant="outlined"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  fullWidth
                  required
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
