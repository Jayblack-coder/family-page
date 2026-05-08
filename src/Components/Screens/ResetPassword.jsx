import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

  const [step, setStep] = useState("request"); 
  // "request" = email input
  // "reset" = token + password

  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // =========================
  // SEND RESET EMAIL
  // =========================
  const handleRequestReset = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    setLoading(true);

    try {
      const res = await API.post(
        "/api/user/forgot-password",
        { email: email.trim() }
      );

      if (res.status === 200) {
        setSuccess("Reset code sent to your email.");
        setStep("reset");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Failed to send reset email."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // RESET PASSWORD
  // =========================
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!token.trim()) {
      setError("Please enter reset code.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      const res = await API.post("/api/user/reset-password", {
        token: token.trim(),
        newPassword: password,
      });

      if (res.status === 200) {
        setSuccess("Password reset successful!");
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Reset failed. Try again."
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
        }}
      >
        <CardContent sx={{ p: 4 }}>

          <Typography variant="h4" align="center" sx={{ mb: 3 }}>
            Reset Password
          </Typography>

          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          {success && (
            <Typography sx={{ mb: 2, color: "lightgreen" }}>
              {success}
            </Typography>
          )}

          {/* =========================
              STEP 1: REQUEST EMAIL
          ========================= */}
          {step === "request" && (
            <form onSubmit={handleRequestReset}>
              <Stack spacing={3}>
                <TextField
                  label="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                  required
                />

                <Button type="submit" variant="contained" disabled={loading}>
                  {loading ? <ClipLoader size={18} color="#fff" /> : "Send Reset Code"}
                </Button>
              </Stack>
            </form>
          )}

          {/* =========================
              STEP 2: RESET PASSWORD
          ========================= */}
          {step === "reset" && (
            <form onSubmit={handleResetPassword}>
              <Stack spacing={3}>

                <TextField
                  label="Reset Code"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  fullWidth
                  required
                />

                <TextField
                  label="New Password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)}>
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  label="Confirm Password"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Button type="submit" variant="contained" disabled={loading}>
                  {loading ? <ClipLoader size={18} color="#fff" /> : "Reset Password"}
                </Button>
              </Stack>
            </form>
          )}

          <Typography align="center" sx={{ mt: 3 }}>
            <Button onClick={() => navigate("/login")} sx={{ color: "#ffd700" }}>
              Back to Login
            </Button>
          </Typography>

        </CardContent>
      </Card>
    </Box>
  );
};

export default ResetPassword;