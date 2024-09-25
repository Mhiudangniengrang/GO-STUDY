import React, { useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import { formatDate } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { PlusOutlined } from "@ant-design/icons";

import { Button } from "antd";

const Calendars = () => {
  const [events, setEvents] = useState([
    {
      title: "hoan thanh swp",
      start: "2024-09-09T10:00:00",
      end: "2024-09-09T17:00:00",
    },
    {
      title: "hoan thanh swr",
      start: "2024-09-23T12:00:00",
      end: "2024-09-23T15:00:00",
    },
    {
      title: "hoan thanh prm",
      start: "2024-08-31T18:00:00",
      end: "2024-09-01T02:00:00",
    },
    {
      title: "hoan thanh exe2",
      start: "2024-09-26T14:00:00",
      end: "2024-09-26T20:00:00",
    },
  ]);

  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });

  const calendarRef = useRef(null);

  const handleDateClick = (arg) => {
    console.log("Ngày được click:", arg.dateStr);
  };

  const handleEventClick = (clickInfo) => {
    console.log("Sự kiện được click:", clickInfo.event);
  };

  const handleAddEvent = () => {
    setEvents([...events, newEvent]);
    setNewEvent({ title: "", start: "", end: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container mx-auto p-4 flex">
      <div className="bg-white rounded-lg shadow-md p-4  w-1/5">
        <Button type="primary">
          <PlusOutlined /> Add new task
        </Button>
        <h2 className="text-xl font-bold my-4">You are going to</h2>
        <ul>
          {events.map((event, index) => (
            <li key={index} className="mb-4">
              <h3 className="font-semibold">{event.title}</h3>
              <p>
                {formatDate(event.start, {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                })}
                <hr className="my-2 border-black" />
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 w-4/5 mx-4">
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          events={events}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
        />
      </div>
    </div>
  );
};

export default Calendars;
