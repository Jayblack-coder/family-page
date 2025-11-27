import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { format, parse, startOfWeek, getDay } from "date-fns";
import enUS from "date-fns/locale/en-US/index.js";


const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

const EventsCalendar = ({ events }) => {
  // Calendar needs proper Date objects
  const formattedEvents = events.map((evt) => ({
    title: evt.title,
    start: new Date(evt.date),
    end: new Date(evt.date),
  }));

  return (
    <div style={{ height: "500px", background: "#fff", borderRadius: "10px" }}>
      <Calendar
        localizer={localizer}
        events={formattedEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
};

export default EventsCalendar;
