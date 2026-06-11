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

const OkoliHome = () => {
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  // Fetch Ekkor family data
  useEffect(() => {
    API.get("/api/user/family-line/okoli")
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
        setFilteredData(data);
      })
      .catch((err) => console.error("API Error:", err));
  }, []);


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
          Okoli Nmelonye Family Members
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
           Brief History of the Okoli Lineage
        </Typography>

        {/* Description */}
        {/* <Typography
          variant="body1"
          sx={{
            mb: { xs: 2, md: 4 },
            textAlign: { xs: "center", md: "left" },
            fontSize: { xs: "0.9rem", md: "1rem" },
          }}
        >
          Okoli Mmaku was born in 1860 as the last son of Nmelonye Ezenweneke. He had a very strong personality and was married to Mgbeke, a lady from
          the family of Obi ako nwa of Isuofia in Anambra state. He was a stammerer with an impressive stature. 
          He was a tall, dark, and very strong man with an intimidating image. Though afflicted early with leprosy, he was highly enterprising
          and was able to amass a lot of land more tha any single individual in the whole of Ndiakunwanta Uno, Arondizuogu.
          He was blessed with four children in the following order of seniority: Jeni Ogboneneye, married to Abel Anyogu, Mgbafor Bridget(Mgbafor gharighari), married to Gabriel Ugbaja Asoanya, Raphael Okoli and Udokwu Okoli.

        </Typography> */}
        <Typography
  variant="body1"
  sx={{
    mb: 2,
    textAlign: { xs: "center", md: "left" },
    fontSize: { xs: "0.9rem", md: "1rem" },
    lineHeight: 1.8,
  }}
>
  Okoli Mmaku was born in 1860 as the youngest son of Nmelonye
  Ezenweneke. He possessed a strong personality and was married to
  Mgbeke, a lady from the family of Obi Ako Nwa of Isuofia in present-day
  Anambra State.
</Typography>

<Typography
  variant="body1"
  sx={{
    mb: 2,
    textAlign: { xs: "center", md: "left" },
    fontSize: { xs: "0.9rem", md: "1rem" },
    lineHeight: 1.8,
  }}
>
  Although he was a stammerer, Okoli was known for his impressive
  stature. He was tall, dark-complexioned, exceptionally strong, and
  carried an intimidating presence. Despite suffering from leprosy at an
  early age, he remained highly enterprising and industrious. Through
  hard work and determination, he acquired more land than any other
  individual in the whole of Ndiakunwanta Uno, Arondizuogu.
</Typography>

<Typography
  variant="body1"
  sx={{
    mb: 1,
    fontWeight: "bold",
    color: "#004aad",
    fontSize: { xs: "0.95rem", md: "1.05rem" },
  }}
>
  Children of Okoli Mmaku
</Typography>

<Typography
  variant="body1"
  sx={{
    mb: 1,
    textAlign: { xs: "center", md: "left" },
    fontSize: { xs: "0.9rem", md: "1rem" },
  }}
>
  He was blessed with four children in the following order of seniority:
</Typography>

<Box component="ol" sx={{ pl: 4, mb: 3 }}>
  <li>
    Jeni Ogboneneye — married to Abel Anyogu
  </li>
  <li>
    Mgbafor Bridget (Mgbafor Gharighari) — married to Gabriel Ugbaja
    Asoanya
  </li>
  <li>
    Raphael Okoli
  </li>
  <li>
    Udokwu Okoli
  </li>
</Box>

<Typography
  variant="body1"
  sx={{
    textAlign: { xs: "center", md: "left" },
    fontSize: { xs: "0.9rem", md: "1rem" },
    lineHeight: 1.8,
  }}
>
  These children constitute the first generation of the Okoli family
  lineage. Okoli's life remains a remarkable example of resilience,
  determination, and enterprise. Despite personal challenges, he built a
  lasting legacy through his industry, strength of character, and the
  family he established, whose descendants continue to preserve and
  expand the heritage of the Nmelonye dynasty.
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
              to="/okoli-one"
              sx={{ bgcolor: "#1976d2", py: 2, borderRadius: 2 }}
            >
              generation One
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              fullWidth
              variant="contained"
              size="large"
              component={Link}
              to="/okoli-two"
              sx={{ bgcolor: "#9c27b0", py: 2, borderRadius: 2 }}
            >
            generation Two
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              fullWidth
              variant="contained"
              size="large"
              component={Link}
              to="/okoli-three"
              sx={{ bgcolor: "#2e7d32", py: 2, borderRadius: 2 }}
            >
            generation Three
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              fullWidth
              variant="contained"
              size="large"
              component={Link}
              to="/okoli-four"
              sx={{ bgcolor: "#ff9800", py: 2, borderRadius: 2 }}
            >
            generation Four
            </Button>
          </Grid>
           <Grid item xs={12} sm={6} md={3}>
            <Button
              fullWidth
              variant="contained"
              size="large"
              component={Link}
              to="/okoli-five"
              sx={{ bgcolor: "#1976d2", py: 2, borderRadius: 2 }}
            >
            generation Five
            </Button>
          </Grid>
        </Grid>
        </Container>
    </Box>
  );
};

export default OkoliHome;
