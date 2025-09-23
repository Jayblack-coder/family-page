import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import {Typography, Container } from "@mui/material";
//import getnwankwoApi from './Api/Api.jsx'
import API  from "./api";

// const API_URL = import.meta.env.VITE_API_BASE_URL;

const Main = () => {
  const [data, setData] = useState([])
  useEffect(()=>{
    axios.get(API, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })
    // .then(res =>setData(res.data))
    .then((res) => {
        console.log("API response:", res.data); // 👀 check structure
        // adjust depending on your API shape
        if (Array.isArray(res.data)) {
          setData(res.data);
        } else if (Array.isArray(res.data.users)) {
          setData(res.data.users);
        } else if (Array.isArray(res.data.data)) {
          setData(res.data.data);
        } else {
          setData([]); // fallback
        }
      })
    .catch(err =>console.log(err));
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
      <table className='table table-bordered table-striped mt-3 '>
        <thead>
          <tr>
            <th>SURNAME</th>
            <th>FIRSTNAME</th>
            <th>MIDDLENAME</th>
            <th>USERNAME</th>
            <th>PARENTS</th>
            <th>FAMILY STATUS</th>
            <th>GENERATION</th>
            <th>DATE OF BIRTH</th>
            <th>SPOUSE</th>
            <th>CITY OF RESIDENCE</th>
            <th>OFFSPRING</th>
          </tr>
           
        </thead>
         <tbody>
          
            {
              data.map((d, i)=>{
                return <tr key={i}>
              <td>{d.surname}</td>
              <td>{d.firstName}</td>
              <td>{d.middleName}</td>
              <td>{d.userName}</td>
              <td>{d.parents}</td>
              <td>{d.familyStatus}</td>
              <td>{d.generation}</td>
              <td>{d.dateOfBirth}</td>
              <td>{d.spouse}</td>
              <td>{d.cityOfResidence}</td>
              <td>{d.offspring}</td>
                       </tr>
              })
             
            }
          
        </tbody>
         {/* <tbody>
          
            {
              data.map((d, i)=>{
                return <tr key={i}>
                      <td>{d.surname}</td>
              <td>{d.firstName}</td>
              <td>{d.middleName}</td>
              <td>{d.userName}</td>
              <td>{d.parents}</td>
              <td>{d.familyStatus}</td>
              <td>{d.generation}</td>
              <td>{d.dateOfBirth}</td>
              <td>{d.spouse}</td>
              <td>{d.cityOfResidence}</td>
                       </tr>
              })
             
            }
          
        </tbody> */}
      </table>
    </div>
  )
}

export default Main
