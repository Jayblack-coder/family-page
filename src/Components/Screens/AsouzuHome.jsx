import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Typography,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Grid,
  Button,
} from "@mui/material";
import API from "./api.jsx";

const AsouzuHome = () => {
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  // Fetch Asouzu family data
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

  // Filter whenever originalData changes
  useEffect(() => {
    const newFilteredData = originalData.filter((item) => {
      return item.surname && item.surname.toLowerCase().includes("asouzu");
    });

    setFilteredData(newFilteredData);
  }, [originalData]);


  return (
    <Box
      sx={{
        bgcolor: "#f9f9f9",
        // minHeight: "100vh",
        py: { xs: 2, sm: 3, md: 5 },
      }}
    >
      <Container maxWidth="xl">
        {/* Page Title */}
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          textAlign="center"
          sx={{
               color: "#004aad",
            mb: { xs: 2, md: 4 },
            fontSize: { xs: "1.6rem", sm: "2rem", md: "2.5rem" },
          }}
        >
          Asouzu Nmelonye Family Members
        </Typography>

        {/* Section Title */}
        <Typography
          variant="h5"
          fontWeight="bold"
          gutterBottom
          sx={{
             color: "#004aad",
            textAlign: { xs: "center", md: "left" },
            fontSize: { xs: "1.2rem", md: "1.6rem" },
          }}
        >
          Brief History of the Asouzu Lineage
        </Typography>

        {/* Description */}
        <Typography
  variant="body1"
  sx={{
    mb: 2,
    textAlign: { xs: "center", md: "left" },
    fontSize: { xs: "0.9rem", md: "1rem" },
  }}
>
  Asouzu Mmaku was born in 1856 as the second child of Nmelonye
  Ezenweneke. He was married to Amanso Okeke, a lady from Agba
  Village in Ekwulobia, Aguata Local Government Area of Anambra
  State.
</Typography>

<Typography
  variant="body1"
  sx={{
    mb: 1,
    textAlign: { xs: "center", md: "left" },
    fontSize: { xs: "0.9rem", md: "1rem" },
  }}
>
  Their union was blessed with four children in the following order
  of seniority:
</Typography>

<Box
  component="ol"
  sx={{
    pl: 4,
    mb: 2,
    fontSize: { xs: "0.9rem", md: "1rem" },
  }}
>
  <li>Charles Ijeoma Asouzu</li>
  <li>Gabriel Asouzu</li>
  <li>Regina Asouzu</li>
  <li>Michael Asouzu</li>
</Box>

<Typography
  variant="body1"
  sx={{
    textAlign: { xs: "center", md: "left" },
    fontSize: { xs: "0.9rem", md: "1rem" },
  }}
>
  These children constitute the first generation of the Asouzu family
  line. Asouzu was a jovial and kind-hearted man known for his
  consistency of character. He lived happily with his wife, Amanso,
  and maintained a very close relationship with his younger brother,
  Udorji. Asouzu died in 1936 at the age of 80 and was given a
  befitting burial by his eldest son, Charles.
</Typography>

        {/* Responsive Table */}
        <TableContainer
          component={Paper}
          elevation={3}
          sx={{
            overflowX: "auto",
            maxHeight: { xs: "60vh", md: "70vh" },
          }}
        >
          <Table stickyHeader sx={{ minWidth: 800, border: "1px solid #ddd" }}>
            <TableHead>
              <TableRow>
                {[
                  "SURNAME",
                  "FIRSTNAME",
                  "MIDDLENAME",
                  // "USERNAME",
                  "PARENTS",
                  "FAMILY STATUS",
                  "GENERATION",
                  "DATE OF BIRTH",
                  "SPOUSE",
                  "CITY OF RESIDENCE",
                  "OFFSPRING",
                ].map((header, i) => (
                  <TableCell
                    key={i}
                    align="center"
                    sx={{
                      fontWeight: "bold",
                      color: "#fff",
                      backgroundColor: "#004aad",
                      fontSize: { xs: "0.7rem", sm: "0.85rem", md: "1rem" },
                    }}
                  >
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((d, i) => (
                <TableRow key={i} hover>
                  <TableCell align="center">{d.surname}</TableCell>
                  <TableCell align="center">{d.firstName}</TableCell>
                  <TableCell align="center">{d.middleName}</TableCell>
                  {/* <TableCell align="center">{d.userName}</TableCell> */}
                  <TableCell align="center">{d.parents}</TableCell>
                  <TableCell align="center">{d.familyStatus}</TableCell>
                  <TableCell align="center">{d.generation}</TableCell>
                  <TableCell align="center">{d.dateOfBirth}</TableCell>
                  <TableCell align="center">{d.spouse}</TableCell>
                  <TableCell align="center">{d.cityOfResidence}</TableCell>
                  <TableCell align="center">{d.offspring}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
         <Grid container spacing={3} justifyContent="center" mt={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              fullWidth
              variant="contained"
              size="large"
              component={Link}
              to="/asouzu-one"
              sx={{ bgcolor: "#1976d2", py: 2, borderRadius: 2 }}
            >
              First generation
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              fullWidth
              variant="contained"
              size="large"
              component={Link}
              to="/asouzu-two"
              sx={{ bgcolor: "#9c27b0", py: 2, borderRadius: 2 }}
            >
            Second generation
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              fullWidth
              variant="contained"
              size="large"
              component={Link}
              to="/asouzu-three"
              sx={{ bgcolor: "#2e7d32", py: 2, borderRadius: 2 }}
            >
            Third generation
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              fullWidth
              variant="contained"
              size="large"
              component={Link}
              to="/asouzu-four"
              sx={{ bgcolor: "#ff9800", py: 2, borderRadius: 2 }}
            >
            Fourth generation 
            </Button>
          </Grid>
           <Grid item xs={12} sm={6} md={3}>
            <Button
              fullWidth
              variant="contained"
              size="large"
              component={Link}
              to="/asouzu-five"
              sx={{ bgcolor: "#1976d2", py: 2, borderRadius: 2 }}
            >
            Fifth generation 
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AsouzuHome;
