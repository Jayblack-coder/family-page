import { useEffect, useState } from "react";
import {
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
} from "@mui/material";
import API from "./api.jsx";

const NwankwoGenTwoProfiles = () => {
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  // ✅ Fetch data
  useEffect(() => {
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
      })
      .catch((err) => console.error("API Error:", err));
  }, []);

  // ✅ Apply filters: surname = Nwankwo && generation = 1
  useEffect(() => {
    const newFilteredData = originalData.filter(
     (item) => item.surname === "Nwankwo" &&
        String(item.generation) === "2nd"
    );
    setFilteredData(newFilteredData);
  }, [originalData]);

  return (
    <Box sx={{ bgcolor: "#f9f9f9", minHeight: "100vh", py: 5 }}>
      <Container maxWidth="xl">
        {/* Page Title */}
        <Typography
          variant="h4"
          fontWeight="bold"
          textAlign="center"
          gutterBottom
          sx={{ color: "#0d6efd", mb: 4 }}
        >
          Nwankwo Family (Generation 2)
        </Typography>

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

export default NwankwoGenTwoProfiles;

