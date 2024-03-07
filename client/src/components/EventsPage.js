import React, {useState, useEffect} from "react";
import EventsList from "./EventsList"
import { Link } from "react-router-dom";

function EventsPage ({user, isAdmin}) {
    const [events, setEvents] = useState([])

    useEffect(() => {
      fetch(`/events`)
      .then((res) => res.json())
      .then((events) => {setEvents(events)})
    }, []);

    const sortedEvents = events.sort((a, b) => (a.event_date) > (b.event_date) ? -1 :1)
    const deleteEvent = (deleted_event) => setEvents(events => events.filter((event) => event.id !== deleted_event.id))

    return (
        <div className="ui container">
            {(user && isAdmin) ?  
                <div style={{marginBottom:  "20px", textAlign: "right"}} className="ui container">     
                    <Link to={`/events/new`} className="ui button small teal">Add Event</Link>
                </div>
                : <div></div>
            }
            <div className="ui container" style={{paddingTop:"5px"}}>
                <EventsList events={sortedEvents} isAdmin={isAdmin} deleteEvent={deleteEvent}/>
            </div>
        </div>
    )
}

export default EventsPage