import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
  CircularProgress,
  Alert,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import API from "../api.jsx";

const OkoliGenThreeProfiles = () => {
  const navigate = useNavigate();
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Fetch data
  useEffect(() => {
    setIsLoading(true);
    setError(null);
    API.get("/api/user")
      .then((res) => {
        console.log("API Response:", res.data);
        // Handle different possible API shapes
        let data = [];
        if (Array.isArray(res.data)) {
          data = res.data;
        } else if (Array.isArray(res.data.users)) {
          data = res.data.users;
        } else if (Array.isArray(res.data.data)) {
          data = res.data.data;
        }
        setOriginalData(data);
        setError(null);
      })
      .catch((err) => {
        const errorMessage = err.response?.data?.message || err.message || "Failed to fetch data";
        console.error("API Error:", err);
        setError(errorMessage);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // ✅ Apply filters: surname = Okoli && generation = 3rd
  useEffect(() => {
    console.log("All data:", originalData);
    console.log("Looking for: Okoli with generation 3rd");
    
    const newFilteredData = originalData.filter((item) => {
      const hasSurname = item.surname && item.surname.toLowerCase().includes("okoli");
      const hasGeneration = String(item.generation).trim() === "3rd";
      
      if (hasSurname && hasGeneration) {
        console.log("Match found:", item);
      }
      
      return hasSurname && hasGeneration;
    });
    
    console.log("Filtered result count:", newFilteredData.length);
    console.log("Filtered Data:", newFilteredData);
    setFilteredData(newFilteredData);
  }, [originalData]);

  return (
    <Box sx={{ bgcolor: "#f9f9f9", 
    // minHeight: "100vh", 
    py: { xs: 3, sm: 4, md: 5 } }}>
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
        {/* Page Title with Back Button */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <IconButton onClick={() => navigate(-1)} sx={{ mr: 2 }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography
            variant="h4"
            fontWeight="bold"
            textAlign="center"
            sx={{ color: "#0d6efd", fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" } }}
          >
            Okoli Family (Generation 3)
          </Typography>
        </Box>

        {/* Loading Spinner */}
        {isLoading && (
          <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
            <CircularProgress size={50} />
          </Box>
        )}

        {/* Error Alert */}
        {error && !isLoading && (
          <Alert severity="error" sx={{ mb: 3 }}>
            <strong>Error:</strong> {error}. Please try refreshing the page.
          </Alert>
        )}

        {/* Grid of Cards */}
        {!isLoading && !error && (
          <Grid 
            container 
            spacing={{ xs: 2, sm: 3, md: 4 }}
            sx={{ justifyContent: "center" }}
          >
            {filteredData.length > 0 ? (
              filteredData.map((member, i) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={i} sx={{ display: "flex", justifyContent: "center" }}>
                  <Card
                    sx={{
                      borderRadius: 3,
                      boxShadow: 3,
                      transition: "0.3s",
                      "&:hover": { boxShadow: 6 },
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    {/* Profile Image */}
                    <CardMedia
                      component="img"
                      height={{ xs: 150, sm: 180, md: 200 }}
                      image={member.image || "https://via.placeholder.com/200"}
                      alt={`${member.firstName} ${member.surname}`}
                      sx={{ objectFit: "cover" }}
                    />

                    <CardContent>
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        textAlign="center"
                        gutterBottom
                        sx={{ fontSize: { xs: "0.9rem", sm: "1rem", md: "1.25rem" } }}
                      >
                        {member.firstName} {member.middleName} {member.surname}
                      </Typography>

                      {/* Profile Details */}
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}>
                        <strong>SURNAME:</strong> {member.surname}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}>
                        <strong>FIRSTNAME:</strong> {member.firstName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}>
                        <strong>MIDDLENAME:</strong> {member.middleName}
                      </Typography>
                      {/* <Typography variant="body2" color="text.secondary">
                        <strong>USERNAME:</strong> {member.userName}
                      </Typography> */}
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}>
                        <strong>PARENTS:</strong> {member.parents}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}>
                        <strong>FAMILY STATUS:</strong> {member.familyStatus}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}>
                        <strong>GENERATION:</strong> {member.generation}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}>
                        <strong>DATE OF BIRTH:</strong> {member.dateOfBirth}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}>
                        <strong>SPOUSE:</strong> {member.spouse}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}>
                        <strong>CITY OF RESIDENCE:</strong> {member.cityOfResidence}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}>
                        <strong>OFFSPRING:</strong> {member.offspring}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <Box sx={{ width: "100%", textAlign: "center", py: { xs: 3, sm: 4, md: 5 } }}>
                <Typography variant="body1" color="text.secondary" sx={{ fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" } }}>
                  No members found for Okoli Generation 3
                </Typography>
              </Box>
            )}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default OkoliGenThreeProfiles;