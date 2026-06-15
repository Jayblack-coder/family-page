import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

import API from "../Screens/api.jsx";
import { useEffect, useState } from "react";


const FamilyRecordsManager = () => {
    const [members, setMembers] = useState([]);
const [selectedMember, setSelectedMember] = useState("");
const [isDeceased, setIsDeceased] = useState(false);
const [dateOfDeath, setDateOfDeath] = useState("");
const [burialInformation, setBurialInformation] = useState("");
const [memorialNotes, setMemorialNotes] = useState("");
const [obituaryImage, setObituaryImage] = useState(null);
useEffect(() => {
  const fetchMembers = async () => {
    try {
      const res = await API.get("/api/user");
      setMembers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  fetchMembers();
}, []);

const [selectedRecord, setSelectedRecord] = useState(null);

useEffect(() => {
  if (!selectedMember) return;

  const member = members.find(
    (m) => m._id === selectedMember
  );

  setSelectedRecord(member);
}, [selectedMember, members]);

useEffect(() => {
  if (!selectedRecord) return;

  setDateOfDeath(selectedRecord.dateOfDeath || "");
  setBurialInformation(
    selectedRecord.burialInformation || ""
  );
  setMemorialNotes(
    selectedRecord.memorialNotes || ""
  );
}, [selectedRecord]);

const handleSave = async () => {
  try {
    const formData = new FormData();

    formData.append("isDeceased", isDeceased);
    formData.append("dateOfDeath", dateOfDeath);
    formData.append("burialInformation", burialInformation);
    formData.append("memorialNotes", memorialNotes);

    if (obituaryImage) {
      formData.append("obituaryImage", obituaryImage);
    }

    const response = await API.put(
      `/api/user/records/${selectedMember}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("UPDATE SUCCESS:", response.data);

    alert("Family record updated successfully");
  } catch (err) {
    console.error("FULL ERROR:", err);
    console.error("STATUS:", err.response?.status);
    console.error("SERVER RESPONSE:", err.response?.data);
  }
};
  return (
    <Box>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Family Records Management
      </Typography>

      {/* Select Member */}

      <TextField
  select
  fullWidth
  label="Select Family Member"
  value={selectedMember}
  onChange={(e) => setSelectedMember(e.target.value)}
>
  {members.map((member) => (
    <MenuItem
      key={member._id}
      value={member._id}
    >
      {member.surname} {member.firstName}
    </MenuItem>
  ))}
</TextField>

      <FormControlLabel
  control={
    <Checkbox
      checked={isDeceased}
      onChange={(e) =>
        setIsDeceased(e.target.checked)
      }
    />
  }
  label="Mark as Deceased"
/>

      <TextField
  type="date"
  label="Date of Death"
  InputLabelProps={{ shrink: true }}
  value={dateOfDeath}
  onChange={(e) => setDateOfDeath(e.target.value)}
/>

<TextField
  label="Burial Information"
  value={burialInformation}
  onChange={(e) => setBurialInformation(e.target.value)}
/>

<TextField
  label="Memorial Notes"
  multiline
  rows={4}
  value={memorialNotes}
  onChange={(e) => setMemorialNotes(e.target.value)}
/>

      

      <Button
        variant="contained"
        component="label"
        sx={{ mt: 2 }}
      >
        Upload Obituary Photograph
       <input
  hidden
  type="file"
  accept="image/*"
  onChange={(e) =>
    setObituaryImage(e.target.files[0])
  }
/>
      </Button>

      <Button
  variant="contained"
  sx={{ mt: 3, ml: 2 }}
  onClick={handleSave}
>
  Save Record
</Button>
    </Box>
  );
};

export default FamilyRecordsManager;