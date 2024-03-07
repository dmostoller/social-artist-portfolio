import React from "react";
// import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Event ({id, name, venue, location, details, image_url, event_date, event_link, isAdmin, deleteEvent}) {
    // const [event, setEvent] = useState();
    const params = useParams()
    const navigate = useNavigate()

    // useEffect(()=>{
    //     fetch(`/events/${params.id}`)
    //     .then(res => res.json())
    //     .then(setEvent)
    //   },[])
    
      const handleDeleteEvent = (event) => {
        if (window.confirm("Are you sure you want to delete this event?")) {
        fetch(`/events/${id}`,{
          method:"DELETE"
        })
        .then(() => {
          deleteEvent(event)
          navigate('/events')
        })
      }
    }
    return (
        <div className="ui container fluid">
            <div className="ui horizontal card fluid" style={{marginBottom: "15px"}}>
                <div className="image" style={{minWidth: "300px"}}>
                    <img src={image_url} alt={name} style={{minWidth: "300px"}}></img>
                </div>
                <div className="content" style={{padding: "25px"}}>
                    <div className="header">{name}</div>
                    <div className="meta">{event_date}</div> 
                    <div className="description">{venue}</div>
                    <div className="description">{location}</div>                                   
                    <div className="description">{details}</div>
                    <div style={{paddingTop: "25px", float: "left"}}> 
                        <a href={event_link} className="ui button small teal" target="_blank" rel="noopener noreferrer">View Event</a>
                    </div>
                    { isAdmin ? (
                        <div style={{paddingTop: "25px", float: "left"}}> 
                            <button className="ui icon button small teal" onClick={handleDeleteEvent}>
                            <i class="trash icon" style={{visibility: "visible"}}></i>
                            </button>
                        </div>
                    )
                    : <></>    
                }
                </div>
            </div>
        </div>
    );
}
