import { useEffect, useState } from "react";
import API from "../Screens/api.jsx";

const Events = () => {
  const [events, setEvents] = useState([]);

  // useEffect(() => {
  //   API.get("/api/events").then(res => setEvents(res.data));
  // }, []);
useEffect(() => {
  API.get("/api/events").then(res => {
    setEvents(res.data.events || res.data || []);
  });
}, []);

  return (
    <div>
      <h1>Family Events</h1>
      {events.map(evt => (
        <div key={evt._id}>
          <h3>{evt.title}</h3>
          <p>{evt.date}</p>
          <p>{evt.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Events;
