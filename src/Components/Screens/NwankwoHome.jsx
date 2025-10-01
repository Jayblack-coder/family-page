import { useEffect, useState } from "react";
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
} from "@mui/material";
import API from "./api.jsx";

const NwankwoHome = () => {
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  // Fetch data once
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
    const newFilteredData = originalData.filter(
      (item) => item.surname === "Nwankwo"
    );
    setFilteredData(newFilteredData);
  }, [originalData]);

  return (
    <Box
      sx={{
        bgcolor: "#f9f9f9",
        minHeight: "100vh",
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
            color: "#0d6efd",
            mb: { xs: 2, md: 4 },
            fontSize: { xs: "1.6rem", sm: "2rem", md: "2.5rem" },
          }}
        >
          Nwankwo Nmelonye Family Tree
        </Typography>

        {/* Section Title */}
        <Typography
          variant="h5"
          fontWeight="bold"
          gutterBottom
          sx={{
            textAlign: { xs: "center", md: "left" },
            fontSize: { xs: "1.2rem", md: "1.6rem" },
          }}
        >
          Family One
        </Typography>

        {/* Description */}
        <Typography
          variant="body1"
          sx={{
            mb: { xs: 2, md: 4 },
            textAlign: { xs: "center", md: "left" },
            fontSize: { xs: "0.9rem", md: "1rem" },
          }}
        >
          This section captures the history, traditions, and achievements of Family
          One. Explore their journey across generations and their contributions to
          our legacy.
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
                  "USERNAME",
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
                      backgroundColor: "#0d6efd",
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
                  <TableCell align="center">{d.userName}</TableCell>
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
              to="/generation-four"
              sx={{ bgcolor: "#1976d2", py: 2, borderRadius: 2 }}
            >
              Generation 4
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              fullWidth
              variant="contained"
              size="large"
              component={Link}
              to="/asouzu"
              sx={{ bgcolor: "#9c27b0", py: 2, borderRadius: 2 }}
            >
              Asouzu Family
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              fullWidth
              variant="contained"
              size="large"
              component={Link}
              to="/asouzu"
              sx={{ bgcolor: "#2e7d32", py: 2, borderRadius: 2 }}
            >
              Udorji Family
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              fullWidth
              variant="contained"
              size="large"
              component={Link}
              to="/udorji"
              sx={{ bgcolor: "#ff9800", py: 2, borderRadius: 2 }}
            >
              Okoli Family
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default NwankwoHome;
