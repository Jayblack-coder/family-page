import { useState, useEffect } from "react";
import {
  Box, Typography, TextField, Button, Grid,
  Card, CardContent, CardMedia, MenuItem, Stack
} from "@mui/material";
import API from "../Screens/api.jsx";
import EventsCalendar from "./EventsCalendar.jsx";

const EventsManager = () => {
  const [events, setEvents] = useState([]);

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("general");
  const [image, setImage] = useState(null);

  const fetchEvents = async () => {
    const res = await API.get("/api/events");
    setEvents(res.data);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handlePostEvent = async () => {
    if (!title || !date) return alert("Title and Date required");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("date", date);
    formData.append("description", description);
    formData.append("category", category);
    if (image) formData.append("image", image);

    await API.post("/api/events", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });

    fetchEvents();
    setTitle(""); setDate(""); setDescription(""); setImage(null);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this event?")) return;

    await API.delete(`/api/events/${id}`);
    fetchEvents();
  };

  return (
    <Box>
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Manage Family Events
      </Typography>

      <Stack spacing={2} mb={3}>
        <TextField label="Event Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <TextField type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <TextField label="Description" multiline rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />

        <TextField select label="Category" value={category} onChange={(e) => setCategory(e.target.value)}>
          <MenuItem value="wedding">Wedding</MenuItem>
          <MenuItem value="burial">Burial</MenuItem>
          <MenuItem value="meeting">Meeting</MenuItem>
          <MenuItem value="general">General Event</MenuItem>
        </TextField>

        <Button variant="outlined" component="label">
          Upload Event Poster
          <input type="file" hidden onChange={(e) => setImage(e.target.files[0])} />
        </Button>

        <Button variant="contained" onClick={handlePostEvent}>
          Post Event
        </Button>
        <Box mt={4}>
  <Typography variant="h5" fontWeight="bold" gutterBottom>
    Family Events Calendar
  </Typography>

  <EventsCalendar events={events} />

</Box>

      </Stack>

      <Grid container spacing={2}>
        {events.map((evt) => (
          <Grid item xs={12} sm={6} md={4} key={evt._id}>
            <Card>
              {evt.image && <CardMedia component="img" height="180" image={evt.image} />}
              <CardContent>
                <Typography variant="h6">{evt.title}</Typography>
                <Typography>{evt.date}</Typography>
                <Typography>{evt.category.toUpperCase()}</Typography>
                <Typography>{evt.description}</Typography>

                <Stack direction="row" spacing={1} mt={2}>
                  <Button size="small" color="error" onClick={() => handleDelete(evt._id)}>Delete</Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default EventsManager;
