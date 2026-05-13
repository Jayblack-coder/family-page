import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import tree from "../../assets/tree.jpg"; // ✅ Use same background as hero page

const Login = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [forgotMode, setForgotMode] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await API.post(
        "/api/user/login",
        { userName, password },
        { headers: { "Content-Type": "application/json" } }
      );
      
      if (res.status === 200) {
      // ✅ Save user + token
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user)); // store full user object

      const user = res.data.user;

      // ✅ Redirect logic
      if (user.isAdmin === true ) {
        alert(`Welcome back, Admin ${user.firstName}!`);
        navigate("/admin");
      } else {
        navigate("/home");
      }
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

  //     if (res.status === 200) {
  //       localStorage.setItem("token", res.data.token);
  //       localStorage.setItem("userName", res.data.userName);
  //       setTimeout(() => navigate("/home"), 2000);
  //     }
  //   } catch (err) {
  //     setError(
  //       err.response?.data?.message ||
  //         err.response?.data?.error ||
  //         "Login failed. Please try again."
  //     );
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <Box
  sx={{
    width: "100vw",
    minHeight: "100vh",
    backgroundImage: `linear-gradient(rgba(10,61,98,0.55), rgba(10,61,98,0.78)), url(${tree})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",

    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",

    px: 2,
    py: 6,
    gap: 4, // ✅ spacing between heading and card
  }}
>
      {/* <Card
        sx={{
          width: { xs: "100%", sm: "85%", md: "400px" },
          borderRadius: 4,
          background: "rgba(255,255,255,0.15)", // ✅ translucent glass
          backdropFilter: "blur(14px)", // ✅ glass effect
          border: "1px solid rgba(255,255,255,0.2)",
          color: "#fff",
          boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
        }} */}
        <Box
  sx={{
    textAlign: "center",
    color: "#fff",
    mb: 5,
    maxWidth: "850px",
    px: 2,
  }}
>
  <Typography
    variant="h2"
    sx={{
      fontWeight: 800,
      letterSpacing: 2,
      mb: 2,
      textShadow: "3px 3px 12px rgba(0,0,0,0.5)",
      fontSize: {
        xs: "2.2rem",
        sm: "3rem",
        md: "4rem",
      },
      fontFamily: "'Playfair Display', serif",
    }}
  >
    Nmelonye Dynasty
  </Typography>

  <Typography
    variant="h6"
    sx={{
      lineHeight: 1.8,
      color: "rgba(255,255,255,0.92)",
      fontWeight: 300,
      textShadow: "1px 1px 6px rgba(0,0,0,0.4)",
      maxWidth: "760px",
      mx: "auto",
      fontSize: {
        xs: "0.95rem",
        sm: "1.1rem",
        md: "1.25rem",
      },
    }}
  >
    A chronicle of our genealogy and traditions, starting from Nmelonye our ancestor in
    Arondizuogu, to our present generation all over the world.
    A rich heritage preserved for those yet unborn.
  </Typography>
</Box>

<Card
  sx={{
    width: { xs: "100%", sm: "85%", md: "420px" },
    borderRadius: "24px",

    // ✅ Stronger glass effect
    background: "rgba(255, 255, 255, 0.12)",
    backdropFilter: "blur(18px)",
    WebkitBackdropFilter: "blur(18px)",

    // ✅ subtle transparent border
    border: "1px solid rgba(255,255,255,0.25)",

    // ✅ modern floating shadow
    boxShadow: "0 8px 32px rgba(0,0,0,0.35)",

    // ✅ preserve visibility
    color: "#fff",

    // ✅ smooth hover animation
    transition: "all 0.3s ease",

    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: "0 12px 40px rgba(0,0,0,0.45)",
    },
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
            Login Account
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

          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <TextField
                label="User Name"
                type="text"
                variant="outlined"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                fullWidth
                required
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
                label="Password"
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
                {loading ? <ClipLoader size={20} color="white" /> : "Login"}
              </Button>

              <Typography sx={{ textAlign: "center", color: "#fff" }}>
                <Link
                  to="/forgot-password"
                  style={{
                    textDecoration: "none",
                    color: "#90caf9",
                    fontWeight: "bold",
                    display: "block",
                    marginBottom: 8,
                  }}
                  onMouseOver={(e) => (e.target.style.color = "#ffffff")}
                  onMouseOut={(e) => (e.target.style.color = "#90caf9")}
                >
                  Forgot Password?
                </Link>
                Not Registered?{" "}
                <Link
                  to="/register"
                  style={{
                    textDecoration: "none",
                   color: "#90caf9",
                    fontWeight: "bold",
                  }}
                  onMouseOver={(e) => (e.target.style.color = "#ffffff")}
onMouseOut={(e) => (e.target.style.color = "#90caf9")}
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
