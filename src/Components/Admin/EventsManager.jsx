import { useState, useEffect } from "react";
import { Box, Typography, TextField, Button, Grid, Card, CardContent, IconButton } from "@mui/material";
import API from "../Screens/api.jsx";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const EventsManager = () => {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState(null);

  const fetchEvents = async () => {
    const res = await API.get("/api/events");
    setEvents(res.data);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleSubmit = async () => {
    if (!title || !date) return alert("Title and Date are required");

    try {
      if (editId) {
        await API.put(`/api/events/${editId}`, { title, date, description });
        alert("Event updated!");
      } else {
        await API.post("/api/events", { title, date, description });
        alert("Event created!");
      }

      setTitle("");
      setDate("");
      setDescription("");
      setEditId(null);
      fetchEvents();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this event?")) return;
    await API.delete(`/api/events/${id}`);
    fetchEvents();
  };

  const handleEdit = (evt) => {
    setEditId(evt._id);
    setTitle(evt.title);
    setDate(evt.date);
    setDescription(evt.description);
  };

  return (
    <Box>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        {editId ? "Edit Event" : "Create Event"}
      </Typography>

      <Box mb={3}>
        <TextField fullWidth label="Event Title" value={title} onChange={(e) => setTitle(e.target.value)} sx={{ mb: 2 }} />
        <TextField type="date" fullWidth value={date} onChange={(e) => setDate(e.target.value)} sx={{ mb: 2 }} />
        <TextField label="Description" fullWidth multiline rows={4}
          value={description} onChange={(e) => setDescription(e.target.value)} sx={{ mb: 2 }} />
        <Button variant="contained" onClick={handleSubmit}>
          {editId ? "Update Event" : "Post Event"}
        </Button>
      </Box>

      {/* Event List */}
      <Grid container spacing={2}>
        {events.map((evt) => (
          <Grid item xs={12} sm={6} md={4} key={evt._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{evt.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {evt.date}
                </Typography>
                <Typography variant="body2">{evt.description}</Typography>

                {/* Buttons */}
                <IconButton onClick={() => handleEdit(evt)} color="primary">
                  <EditIcon />
                </IconButton>

                <IconButton onClick={() => handleDelete(evt._id)} color="error">
                  <DeleteIcon />
                </IconButton>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default EventsManager;
