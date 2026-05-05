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
  IconButton,
} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import API from "../api.jsx";

const AsouzuGenFourProfiles = () => {
  const navigate = useNavigate();
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  // ✅ Fetch data
  useEffect(() => {
    API.get("/api/user/family-line/asouzu")
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
      })
      .catch((err) => console.error("API Error:", err));
  }, []);

  // ✅ Apply generation filter: generation = 4th
  useEffect(() => {
    const newFilteredData = originalData.filter(
     (item) =>
        String(item.generation) === "4th"
    );
    setFilteredData(newFilteredData);
  }, [originalData]);

  return (
    <Box sx={{ bgcolor: "#f9f9f9", minHeight: "100vh", py: 5 }}>
      <Container maxWidth="xl">
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
            Asouzu Family (Generation 4)
          </Typography>
        </Box>

        {/* Grid of Cards */}
        <Grid container spacing={3}>
          {filteredData.map((member, i) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: 3,
                  transition: "0.3s",
                  "&:hover": { boxShadow: 6 },
                }}
              >
                {/* Profile Image */}
                <CardMedia
                  component="img"
                  height="200"
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
                  >
                    {member.firstName} {member.middleName} {member.surname}
                  </Typography>

                  {/* Profile Details */}
                  <Typography variant="body2" color="text.secondary">
                    <strong>SURNAME:</strong> {member.surname}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>FIRSTNAME:</strong> {member.firstName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>MIDDLENAME:</strong> {member.middleName}
                  </Typography>
                  {/* <Typography variant="body2" color="text.secondary">
                    <strong>USERNAME:</strong> {member.userName}
                  </Typography> */}
                  <Typography variant="body2" color="text.secondary">
                    <strong>PARENTS:</strong> {member.parents}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>FAMILY STATUS:</strong> {member.familyStatus}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>GENERATION:</strong> {member.generation}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>DATE OF BIRTH:</strong> {member.dateOfBirth}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>SPOUSE:</strong> {member.spouse}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>CITY OF RESIDENCE:</strong> {member.cityOfResidence}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>OFFSPRING:</strong> {member.offspring}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default AsouzuGenFourProfiles;

