import { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import API from "./api";
import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { ClipLoader } from "react-spinners";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import tree from "../../assets/tree.jpg";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token: tokenParam } = useParams();
  const [searchParams] = useSearchParams();
  const token = tokenParam || searchParams.get("token");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!token) {
      setError("");
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!token) {
      if (!email.trim()) {
        setError("Please enter your email address.");
        return;
      }

      setLoading(true);
      try {
        const res = await API.post(
          "/api/user/forgot-password",
          { email: email.trim() },
          { headers: { "Content-Type": "application/json" } }
        );
        if (res.status === 200) {
          setSuccess("Password reset instructions have been sent to your email.");
        }
      } catch (err) {
        setError(
          err.response?.data?.message ||
            err.response?.data?.error ||
            "Failed to send reset link. Please try again."
        );
      } finally {
        setLoading(false);
      }
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);

    try {
      const res = await API.post(
        "/api/user/reset-password",
        { token, newPassword: password },
        { headers: { "Content-Type": "application/json" } }
      );
      if (res.status === 200) {
        setSuccess("Password reset successfully! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Failed to reset password. Please try again."
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
        backgroundImage: `linear-gradient(rgba(10,61,98,0.55), rgba(10,61,98,0.75)), url(${tree})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
      }}
    >
      <Card
        sx={{
          width: { xs: "100%", sm: "85%", md: "400px" },
          borderRadius: 4,
          background: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(14px)",
          border: "1px solid rgba(255,255,255,0.2)",
          color: "#fff",
          boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
        }}
      >
        <CardContent sx={{ p: { xs: 4, sm: 5 } }}>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{
              fontWeight: "bold",
              color: "#fff",
              textShadow: "2px 2px 4px rgba(0,0,0,0.4)",
              mb: 3,
            }}
          >
            Reset Password
          </Typography>

          {error && (
            <Typography
              color="error"
              variant="body2"
              align="center"
              gutterBottom
              sx={{ backgroundColor: "rgba(255,0,0,0.15)", borderRadius: 1, py: 1 }}
            >
              {error}
            </Typography>
          )}

          {success && (
            <Typography
              color="success"
              variant="body2"
              align="center"
              gutterBottom
              sx={{ backgroundColor: "rgba(0,255,0,0.15)", borderRadius: 1, py: 1 }}
            >
              {success}
            </Typography>
          )}

          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              {!token ? (
                <TextField
                  label="Email address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  fullWidth
                  InputProps={{
                    sx: {
                      color: "#fff",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(255,255,255,0.5)",
                      },
                    },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      color: "#fff",
                      "& fieldset": { borderColor: "rgba(255,255,255,0.5)" },
                      "&:hover fieldset": { borderColor: "#fff" },
                    },
                    "& .MuiInputLabel-root": { color: "#fff" },
                  }}
                />
              ) : (
                <>
                  <TextField
                    label="New Password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                            sx={{ color: "#fff" }}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        color: "#fff",
                        "& fieldset": { borderColor: "rgba(255,255,255,0.5)" },
                        "&:hover fieldset": { borderColor: "#fff" },
                      },
                      "& .MuiInputLabel-root": { color: "#fff" },
                    }}
                  />

                  <TextField
                    label="Confirm New Password"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            edge="end"
                            sx={{ color: "#fff" }}
                          >
                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        color: "#fff",
                        "& fieldset": { borderColor: "rgba(255,255,255,0.5)" },
                        "&:hover fieldset": { borderColor: "#fff" },
                      },
                      "& .MuiInputLabel-root": { color: "#fff" },
                    }}
                  />
                </>
              )}

              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
                sx={{
                  background:
                    "linear-gradient(135deg, #004aad, #1976d2)",
                  fontWeight: "bold",
                  py: 1.5,
                  borderRadius: 2,
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #003580, #1565c0)",
                  },
                }}
              >
                {loading ? (
                  <ClipLoader size={20} color="white" />
                ) : token ? (
                  "Reset Password"
                ) : (
                  "Send Reset Link"
                )}
              </Button>

              <Typography sx={{ textAlign: "center", color: "#fff" }}>
                <Button
                  onClick={() => navigate("/login")}
                  sx={{
                    textDecoration: "none",
                    color: "#ffd700",
                    fontWeight: "bold",
                    textTransform: "none",
                  }}
                >
                  Back to Login
                </Button>
              </Typography>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ResetPassword;