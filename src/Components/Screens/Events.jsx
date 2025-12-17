import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Container,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Button,
  Chip,
} from "@mui/material";
import { CalendarMonth, Category, Image as ImageIcon } from "@mui/icons-material";
import { motion } from "framer-motion";
import API from "../Screens/api.jsx";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [month, setMonth] = useState("");
  const [category, setCategory] = useState("");
  const [showUpcoming, setShowUpcoming] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await API.get("/api/events");
        setEvents(res.data.events || res.data || []);
      } catch (err) {
        console.error("Failed to load events:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    const now = new Date();
    const matchesMonth = month ? eventDate.getMonth() + 1 === Number(month) : true;
    const matchesCategory = category ? event.category === category : true;
    const matchesUpcoming = showUpcoming ? eventDate >= now : true;
    return matchesMonth && matchesCategory && matchesUpcoming;
  });

  return (
    <Box sx={{ minHeight: "100vh", background: "#f5f6fa", py: 6 }}>
      <Container maxWidth="lg">
        {/* Filters */}
        <Grid container spacing={3} justifyContent="center" sx={{ mb: 5 }}>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel>Filter by Month</InputLabel>
              <Select value={month} label="Filter by Month" onChange={(e) => setMonth(e.target.value)}>
                <MenuItem value="">All Months</MenuItem>
                {[...Array(12)].map((_, i) => (
                  <MenuItem key={i + 1} value={i + 1}>
                    {new Date(0, i).toLocaleString("default", { month: "long" })}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel>Filter by Category</InputLabel>
              <Select value={category} label="Filter by Category" onChange={(e) => setCategory(e.target.value)}>
                <MenuItem value="">All</MenuItem>
                <MenuItem value="meeting">Meeting</MenuItem>
                <MenuItem value="wedding">Wedding</MenuItem>
                <MenuItem value="burial">Burial</MenuItem>
                <MenuItem value="family">Family</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12} md={3}>
            <Button
              fullWidth
              variant={showUpcoming ? "contained" : "outlined"}
              color="success"
              onClick={() => setShowUpcoming(!showUpcoming)}
              sx={{ height: "100%" }}
            >
              {showUpcoming ? "Showing Upcoming" : "Show Upcoming Events"}
            </Button>
          </Grid>
        </Grid>

        <Typography variant="h4" fontWeight={700} textAlign="center" sx={{ mb: 4 }}>
          Family Events
        </Typography>

        {loading ? (
          <Typography textAlign="center">Loading events...</Typography>
        ) : filteredEvents.length === 0 ? (
          <Typography textAlign="center">No events found.</Typography>
        ) : (
          <Grid container spacing={4} justifyContent="center">
            {filteredEvents.map((event, index) => (
              <Grid item xs={12} sm={6} md={4} key={event._id || index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <Card sx={{ borderRadius: "20px", boxShadow: 3 }}>
                    {event.image ? (
                      <CardMedia
                        component="img"
                        height="180"
                        image={event.image}
                        alt={event.title}
                      />
                    ) : (
                      <Box
                        sx={{
                          height: 180,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: "#eaeaea",
                        }}
                      >
                        <ImageIcon sx={{ fontSize: 60, color: "#9e9e9e" }} />
                      </Box>
                    )}

                    <CardContent>
                      <Typography variant="h6" fontWeight={700}>
                        {event.title}
                      </Typography>

                      <Box sx={{ display: "flex", alignItems: "center", mt: 1, color: "gray" }}>
                        <CalendarMonth fontSize="small" />
                        <Typography sx={{ ml: 1 }}>{event.date}</Typography>
                      </Box>

                      <Box sx={{ display: "flex", alignItems: "center", mt: 1, color: "gray" }}>
                        <Category fontSize="small" />
                        <Chip
                          label={event.category}
                          color="primary"
                          variant="outlined"
                          sx={{ ml: 1, textTransform: "capitalize" }}
                        />
                      </Box>

                      {event.description && (
                        <Typography sx={{ mt: 2, color: "#444" }}>
                          {event.description.length > 100
                            ? event.description.substring(0, 100) + "..."
                            : event.description}
                        </Typography>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}
