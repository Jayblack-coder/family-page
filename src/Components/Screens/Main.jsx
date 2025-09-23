import { useEffect } from 'react'
// import axios from 'axios'
import { useState } from 'react'
import {
  Table, TableBody, TableCell, TableContainer, Container,
  TableHead, TableRow, Paper
} from "@mui/material";
import API  from "./api.jsx";

// const API_URL = import.meta.env.VITE_API_BASE_URL;

const Main = () => {
  const [data, setData] = useState([])
  useEffect(()=>{
    API.get("/api/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(res =>setData(res.data))
    .catch(err =>console.log(err));
//   useEffect(() => {
//   API.get("/api/user")
//     .then((res) => {
//       console.log("API response:", res.data); // 👀 check this in console

//       if (Array.isArray(res.data)) {
//         setData(res.data);              // case: backend sends array
//       } else if (Array.isArray(res.data.users)) {
//         setData(res.data.users);        // case: backend sends { users: [...] }
//       } else if (Array.isArray(res.data.data)) {
//         setData(res.data.data);         // case: backend sends { data: [...] }
//       } else {
//         setData([]);                    // fallback
//       }
//     })
//     .catch((err) => console.error(err));
// }, []);

  })
  return (
    
    <div >
      <h3 className="text-center text-primary">Nwankwo Nmelonye Family Tree</h3>
      <Container sx={{ py: 5 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Family One
      </Typography>
      <Typography variant="body1">
        This section captures the history, traditions, and achievements of Family One. 
        Explore their journey across generations and their contributions to our legacy.
      </Typography>
    </Container>
      <TableContainer component={Paper} elevation={3}>
  <Table sx={{ minWidth: 650, border: "1px solid #ddd" }}>
    <TableHead>
      <TableRow sx={{ backgroundColor: "#0d6efd" }}>
        {[
          "SURNAME","FIRSTNAME","MIDDLENAME","USERNAME","PARENTS",
          "FAMILY STATUS","GENERATION","DATE OF BIRTH","SPOUSE",
          "CITY OF RESIDENCE","OFFSPRING"
        ].map((header, i) => (
          <TableCell key={i} sx={{ fontWeight: "bold", color: "#fff" }} align="center">
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
    </div>
  )
}

export default Main
