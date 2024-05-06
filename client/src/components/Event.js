import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../context/user";
import { useAdmin } from "../context/admin.js"
import { Modal } from "semantic-ui-react";
import PaintingModal from "./PaintingModal";
import EventModal from "./EventModal.js";

export default function Event ({id, name, venue, location, details, image_url, event_date, event_link, onDeleteEvent}) {
    const { user } = useUser()
    const { isAdmin } = useAdmin()

    const handleDeleteEvent = (event) => {
        if (window.confirm("Are you sure you want to delete this event?")) {
        fetch(`/events/${id}`, {
            method: "DELETE"
            })
            .then(() => {
                onDeleteEvent(id)
            })
        }
    }    

    return (
        <div className="ui container fluid">
            <div className="ui horizontal card fluid" style={{marginBottom: "15px"}}>
                <div className="image" style={{minWidth: "400px"}}>
                    <img className='ui medium' 
                    src={image_url} alt={name} 
                    onClick={handleOpen}  
                    style={{minWidth: "400px"}}>
                    </img>
                        <Modal
                            open={modalOpen}
                            onClose={handleClose}
                            basic={true}
                            >
                            <EventModal image={image} name={name}/>
                        </Modal>
                </div>
                <div className="content" style={{padding: "25px"}}>
                    <div className="header">{name}</div>
                    <div className="meta">{event_date}</div> 
                    <div className="description">{venue}</div>
                    <div className="description">{location}</div>                                   
                    <div className="description">{details}</div>
                    <div style={{paddingTop: "20px"}}> 
                    <a href={event_link} className="ui circular button small teal" target="_blank" rel="noopener noreferrer">Go To Event</a>
                    { user && isAdmin ? (
                        <>
                            <Link to={`/events/${id}/edit`} className="ui circular icon button small teal">
                                <i className="edit icon"></i>
                            </Link>
                            <div className="ui circular icon button small teal" onClick={handleDeleteEvent}>
                                <i class="trash icon"></i>
                            </div>
                        </>
                        )
                        : <></>    
                    }
                </div>
                </div>
            </div>
        </div>
    );
}
