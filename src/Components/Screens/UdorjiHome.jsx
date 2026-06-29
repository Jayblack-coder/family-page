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
  Button
} from "@mui/material";
import API from "./api.jsx";

const UdorjiHome = () => {
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  // Fetch Udorji family data
  useEffect(() => {
    API.get("/api/user/family-line/udorji")
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
          Udoji  Nmelonye Family Members
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
          Brief History of the Udorji Lineage
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
  Udorji Mmaku was born in 1858 as the third son of Nmelonye and
  Mmaku. He married three wives. His first wife was Oduagu; his
  second wife was Ihudiye from Okeke Ogbukiyi's family in
  Ndiakunwanta; and his third wife was Igbomba from the family of
  Nnabugwu, also of Ndiakunwanta.
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
  Children of Oduagu
</Typography>

<Box component="ol" sx={{ pl: 4, mb: 3 }}>
  <li>Fredrich Udorji</li>
  <li>Samuel Udorji</li>
  <li>Joshua Udorji</li>
  <li>Ejiagha Udorji</li>
</Box>

<Typography
  variant="body1"
  sx={{
    mb: 1,
    fontWeight: "bold",
    color: "#004aad",
    fontSize: { xs: "0.95rem", md: "1.05rem" },
  }}
>
  Children of Ihudiye
</Typography>

<Box component="ol" sx={{ pl: 4, mb: 3 }}>
  <li>Peter Udorji (Ezenaguoha)</li>
  <li>Elizabeth Udorji</li>
  <li>Ugekwe Udorji</li>
</Box>

<Typography
  variant="body1"
  sx={{
    mb: 1,
    fontWeight: "bold",
    color: "#004aad",
    fontSize: { xs: "0.95rem", md: "1.05rem" },
  }}
>
  Children of Igbomba
</Typography>

<Box component="ol" sx={{ pl: 4, mb: 3 }}>
  <li>Simeon Udorji</li>
  <li>Priscilla Anyakoha Udorji</li>
  <li>Agnes Okonkwo Udorji (Udime)</li>
  <li>Maria Arodiogbu Udorji</li>
</Box>

<Typography
  variant="body1"
  sx={{
    textAlign: { xs: "center", md: "left" },
    fontSize: { xs: "0.9rem", md: "1rem" },
    lineHeight: 1.8,
  }}
>
  These children constitute the first generation of the Udorji family
  lineage. Udorji was instrumental in bringing Catholicism to
  Ndiakunwanta Idozuka. Together with his family and the support of
  the surrounding community, he helped build the first church in the
  area, which later evolved into the present-day St. Joseph's Catholic
  Church, Ndiakunwanta Idozuka.
</Typography>

<Typography
  variant="body1"
  sx={{
    mt: 2,
    textAlign: { xs: "center", md: "left" },
    fontSize: { xs: "0.9rem", md: "1rem" },
    lineHeight: 1.8,
  }}
>
  He never tired of encouraging his children, grandchildren, nephews,
  and grandnephews to excel and distinguish themselves in life. He
  strongly condemned all forms of mediocrity, lukewarmness, and lack
  of love. As the last surviving son of Nmelonye Ezenweneke, he bore
  the responsibility of defending his brothers, sisters, and their
  descendants against injustice and oppression.
</Typography>

<Typography
  variant="body1"
  sx={{
    mt: 2,
    textAlign: { xs: "center", md: "left" },
    fontSize: { xs: "0.9rem", md: "1rem" },
    lineHeight: 1.8,
  }}
>
  A highly respected community leader, his words carried great weight
  in matters of policy and communal decision-making. A man of
  exceptional brilliance, courage, and integrity, Mazi Udorji died in
  1983 at the remarkable age of 125, making him the longest-living
  child of Mazi Nmelonye. He was laid to rest in the family compound
  at Ndiakunwanta Idozuka, where his legacy continues to inspire
  generations.
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
              to="/udorji-one"
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
              to="/udorji-two"
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
              to="/udorji-three"
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
              to="/udorji-four"
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
              to="/udorji-five"
              sx={{ bgcolor: "#1976d2", py: 2, borderRadius: 2 }}
            >
            generation Five
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );

}
export default UdorjiHome;
