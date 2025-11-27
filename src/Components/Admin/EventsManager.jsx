import EventsCalendar from "./EventsCalendar";

const EventsManager = () => {
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    const res = await API.get("/api/events");
    setEvents(res.data); // backend returns array
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <Box>
      {/* form here */}
      
      <Grid container spacing={2}>
        {events.map((evt, i) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <Card>
              <CardContent>
                <Typography variant="h6">{evt.title}</Typography>
                <Typography>{evt.date}</Typography>
                <Typography>{evt.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* 📅 CALENDAR */}
      <Box mt={5}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Family Events Calendar
        </Typography>
        <EventsCalendar events={events} />
      </Box>
    </Box>
  );
};
export default EventsManager;
