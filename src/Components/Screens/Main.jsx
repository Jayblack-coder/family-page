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

const Main = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    API.get("/api/user")
      .then((res) => {
        console.log("API response:", res.data);

        if (Array.isArray(res.data)) {
          setData(res.data);
        } else if (Array.isArray(res.data.users)) {
          setData(res.data.users);
        } else if (Array.isArray(res.data.data)) {
          setData(res.data.data);
        } else {
          setData([]);
        }
      })
      .catch((err) => console.error(err));
  }, []);

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
            overflowX: "auto", // horizontal scroll on small screens
            maxHeight: { xs: "60vh", md: "70vh" }, // adaptive height
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
              {data.map((d, i) => (
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
      </Container>
    </Box>
  );
};

export default Main;
