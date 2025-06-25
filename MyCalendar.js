import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useState } from "react";
import MyModal from "./MyModal";

//dnd calendar
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

// react BasicCalendar component
const BasicCalendar = () => {
  const [events, setEvents] = useState([]);

  //states for creating event
  const [modalStatus, setModalStatus] = useState(false);
  const [eventInput, setEventInput] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  //state for on select event
  const [eventId, setEventId] = useState("");
  const [editStatus, setEditStatus] = useState(false);

  const handleClose = () => {
    setModalStatus(false);
    setEventInput("");
  };

  const handleChange = (e) => {
    setEventInput(e.target.value);
  };

  const handleSave = () => {
    setModalStatus(false);
    if (eventInput) {
      setEvents([
        ...events,
        {
          id: Date.now(),
          title: `${eventInput}`,
          start: new Date(`${startDate}`),
          end: new Date(`${endDate}`),
        },
      ]);
    }
  };

  //slot select handler
  const handleSlotSelectEvent = (slotInfo) => {
    setStartDate(new Date(`${slotInfo.start}`));
    setEndDate(new Date(`${slotInfo.end}`));
    setModalStatus(true);
    setEventInput("");
  };

  //move event handler
  const moveEventHandler = ({ event, start, end }) => {
    let updatedEvents = [];
    updatedEvents = events.filter((e) => {
      return e.id !== event.id;
    });
    setEvents([
      ...updatedEvents,
      {
        id: `${event.id}`,
        title: `${event.title}`,
        start: new Date(`${start}`),
        end: new Date(`${end}`),
      },
    ]);
  };

  //resize event handler
  const resizeEventHandler = ({ event, start, end }) => {
    let updatedEvents = [];
    updatedEvents = events.filter((e) => {
      return e.id !== event.id;
    });
    setEvents([
      ...updatedEvents,
      {
        id: `${event.id}`,
        title: `${event.title}`,
        start: new Date(`${start}`),
        end: new Date(`${end}`),
      },
    ]);
  };

  //on select event handler
  const hanldeOnSelectEvent = (e) => {
    setEditStatus(true);
    setStartDate(new Date(`${e.start}`));
    setEndDate(new Date(`${e.end}`));
    setEventInput(e.title);
    setEventId(e.id);
    setModalStatus(true);
  };

  const handleEditEvent = (e) => {
    setEventInput(e.target.value);
  };
  const handleEdited = (e) => {
    setModalStatus(false);
    let updatedEvents = [];
    if (eventInput) {
      updatedEvents = events.filter((e) => {
        return e.id !== eventId;
      });
      setEvents([
        ...updatedEvents,
        {
          id: `${eventId}`,
          title: `${eventInput}`,
          start: new Date(`${startDate}`),
          end: new Date(`${endDate}`),
        },
      ]);
    } else {
      updatedEvents = events.filter((e) => {
        return e.id !== eventId;
      });
      setEvents([...updatedEvents]);
    }
    setEditStatus(false);
    setEventInput("");
  };

  // on delete event handler
  const handleDelete = () => {
    let updatedEvents = [];
    updatedEvents = events.filter((e) => {
      return e.id !== eventId;
    });
    setEvents([...updatedEvents]);
    setModalStatus(false);
    setEventInput("");
  };

  return (
    <div className="my-calendar">
      <DnDCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        //event trigger after clicking any slot
        onSelectSlot={handleSlotSelectEvent}
        //event trigger after clicking any event
        onSelectEvent={hanldeOnSelectEvent}
        //event for drag and drop
        onEventDrop={moveEventHandler}
        //event trigger hen resizing any event
        resizable
        onEventResize={resizeEventHandler}
        // onSelecting={slot => false}
        longPressThreshold={10}
      />
      <MyModal
        modalStatus={modalStatus}
        handleClose={handleClose}
        handleSave={handleSave}
        handleChange={handleChange}
        startDate={startDate}
        endDate={endDate}
        eventInput={eventInput}
        handleEditEvent={handleEditEvent}
        handleEdited={handleEdited}
        editStatus={editStatus}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default BasicCalendar;
