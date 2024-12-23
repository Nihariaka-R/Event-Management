import React, { useState } from 'react';
import { toast } from 'react-toastify';

const EventManager: React.FC = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');

  const handleAddEvent = () => {
    if (!eventName || !eventDate) {
      toast.error('Please provide event name and date!');
      return;
    }

    const newEvent = { name: eventName, date: eventDate, id: Date.now() };
    setEvents([...events, newEvent]);
    toast.success('Event added successfully!');
  };

  const handleDeleteEvent = (id: string) => {
    setEvents(events.filter((event) => event.id !== id));
    toast.success('Event deleted successfully!');
  };

  const handleUpdateEvent = (id: string, updatedName: string, updatedDate: string) => {
    setEvents(
      events.map((event) =>
        event.id === id ? { ...event, name: updatedName, date: updatedDate } : event
      )
    );
    toast.success('Event updated successfully!');
  };

  return (
    <div>
      <h2>Event Manager</h2>
      <input
        type="text"
        placeholder="Event Name"
        value={eventName}
        onChange={(e) => setEventName(e.target.value)}
      />
      <input
        type="date"
        value={eventDate}
        onChange={(e) => setEventDate(e.target.value)}
      />
      <button onClick={handleAddEvent}>Add Event</button>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            {event.name} - {new Date(event.date).toLocaleDateString()}
            <button onClick={() => handleUpdateEvent(event.id, event.name, event.date)}>
              Edit
            </button>
            <button onClick={() => handleDeleteEvent(event.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventManager;
