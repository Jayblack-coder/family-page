import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import { useEffect, useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import API from "../Screens/api.jsx";

const locales = { "en-US": require("date-fns/locale/en-US") };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const EventsCalendar = () => {
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    const res = await API.get("/api/events");
    setEvents(
      res.data.map((evt) => ({
        title: evt.title,
        start: new Date(evt.date),
        end: new Date(evt.date),
      }))
    );
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div style={{ height: 600, background: "#fff", padding: 20, borderRadius: 12 }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
      />
    </div>
  );
};

export default EventsCalendar;
