import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
//import getnwankwoApi from './Api/Api.jsx'

const API_URL = import.meta.env.VITE_API_URL;

const Main = () => {
  const [data, setData] = useState([])
  useEffect(()=>{
    axios.get(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(res =>setData(res.data))
    .catch(err =>console.log(err));
  })
  return (
    <div >
      <h3 className="text-center text-primary">Nwankwo Nmelonye Family Tree</h3>
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
              <td>{Array.isArray(d.offspring) ? d.offspring.join(', ') : d.offspring}</td>
                       </tr>
              })
             
            }
          
        </tbody>
      </table>
    </div>
  )
}

export default Main
