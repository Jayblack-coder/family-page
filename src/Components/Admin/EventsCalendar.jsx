const EventsCalendar = ({ events }) => {
  const safeEvents = Array.isArray(events) ? events : [];

  const formattedEvents = safeEvents.map((evt) => ({
    title: evt.title,
    start: new Date(evt.date),
    end: new Date(evt.date),
  }));

  return (
    <div style={{ height: "500px" }}>
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