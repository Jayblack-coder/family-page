import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useEffect, useState } from "react";
import API from "../Screens/api.jsx";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const CalendarView = () => {
  const [events, setEvents] = useState([]);

  const loadEvents = async () => {
    const res = await API.get("/api/events");
    const mapped = res.data.map(evt => ({
      title: evt.title,
      start: new Date(evt.date),
      end: new Date(evt.date)
    }));
    setEvents(mapped);
  };

  useEffect(() => {
    loadEvents();
  }, []);

  return (
    <div style={{ height: 600, background: "white", padding: 20 }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
      />
    </div>
  );
};

export default CalendarView;
