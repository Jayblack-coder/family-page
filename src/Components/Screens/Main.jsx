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
  Box 
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
    <Box sx={{ bgcolor: "#f9f9f9", minHeight: "100vh", py: { xs: 2, md: 5 } }}>
      <Container maxWidth="lg">
        <Typography 
          variant="h4" 
          fontWeight="bold" 
          gutterBottom 
          textAlign="center"
          sx={{ color: "#0d6efd", mb: 3 }}
        >
          Nwankwo Nmelonye Family Tree
        </Typography>

        <Typography 
          variant="h5" 
          fontWeight="bold" 
          gutterBottom
          sx={{ textAlign: { xs: "center", md: "left" } }}
        >
          Family One
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ mb: 4, textAlign: { xs: "center", md: "left" } }}
        >
          This section captures the history, traditions, and achievements of Family One. 
          Explore their journey across generations and their contributions to our legacy.
        </Typography>

        {/* Responsive Table with sticky headers */}
        <TableContainer 
          component={Paper} 
          elevation={3} 
          sx={{ overflowX: "auto", maxHeight: "70vh" }} // max height to allow vertical scroll
        >
          <Table stickyHeader sx={{ minWidth: 650, border: "1px solid #ddd" }}>
            <TableHead>
              <TableRow>
                {[
                  "SURNAME","FIRSTNAME","MIDDLENAME","USERNAME","PARENTS",
                  "FAMILY STATUS","GENERATION","DATE OF BIRTH","SPOUSE",
                  "CITY OF RESIDENCE","OFFSPRING"
                ].map((header, i) => (
                  <TableCell 
                    key={i} 
                    align="center"
                    sx={{ 
                      fontWeight: "bold", 
                      color: "#fff", 
                      backgroundColor: "#0d6efd", 
                      top: 0, 
                      zIndex: 1 
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
