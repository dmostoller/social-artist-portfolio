import React, {useState, useEffect} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

function EditEvent() {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [event, setEvent] = useState({})
    const {id} = useParams();


  useEffect(() => {
      fetch(`/events/${id}`)
      .then((res) => res.json())
      .then((event) => setEvent(event))
  }, [id]);


    const formSchema = yup.object().shape({
        name: yup.string().required("Must enter a title"),
        venue: yup.string().required("Must enter a venue"),
        location: yup.string().required("Must enter a location"),
        details: yup.string().required("Must enter event details"),
        image_url: yup.string().required("Must enter an image link"),
        event_date: yup.date().required("Must enter a date"),
        event_link: yup.string().required("Must enter an event link"),
    })
    const initValues = event 

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initValues,
        validationSchema: formSchema,
        onSubmit: (values) => {
          fetch(`/events/${id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          }).then((res) => {
            if(res.ok) {
              res.json().then(event => {
                navigate(`/events/${id}`)
              })
            } else {
                res.json().then(error => setError(error.message))
            }
          })
        },
      })

    return (
        <>
        {error && <h2 style={{color:'red', textAlign:'center'}}> {error} </h2>}
        <div className="ui container">
            <form style={{width:"60%", margin:"auto", padding:"25px"}} className="ui form" onSubmit={formik.handleSubmit}>
                <div className="field">
                    <label>Add Event</label>
                    <input type="text"  name="name" value={formik.values.name} placeholder="Event Name..." onChange={formik.handleChange}></input>
                    {formik.errors && <p style={{color:'red', textAlign:'center'}}>{formik.errors.name}</p>}
                </div>
                <div className="field">
                    <input type="text"  name="venue" value={formik.values.venue} placeholder="Venue..." onChange={formik.handleChange}></input>               
                    {formik.errors && <p style={{color:'red', textAlign:'center'}}>{formik.errors.venue}</p>}
                </div>    
                <div className="field">
                    <input type="text" name="location" value={formik.values.location} placeholder="Location address..." onChange={formik.handleChange}></input>               
                    {formik.errors && <p style={{color:'red', textAlign:'center'}}>{formik.errors.location}</p>}
                </div>    
                <div className="field">
                    <input type="text"  name="image_url" value={formik.values.image_url} placeholder="Image link..." onChange={formik.handleChange}></input>               
                    {formik.errors && <p style={{color:'red', textAlign:'center'}}>{formik.errors.image_url}</p>}
                </div>    
                <div className="field">
                    <input type="text"  name="event_date" value={formik.values.event_date} placeholder="Event Date (MM/DD/YYYY)..." onChange={formik.handleChange}></input>               
                    {formik.errors && <p style={{color:'red', textAlign:'center'}}>{formik.errors.event_date}</p>}
                </div>  
                <div className="field">
                    <input type="text"  name="event_link" value={formik.values.event_link} placeholder="Link to Event..." onChange={formik.handleChange}></input>               
                    {formik.errors && <p style={{color:'red', textAlign:'center'}}>{formik.errors.event_link}</p>}
                </div>      
                <div className="field">
                    <textarea type="text" rows="6" name="details" value={formik.values.details} placeholder="Event Details..." onChange={formik.handleChange}></textarea>               
                    {formik.errors && <p style={{color:'red', textAlign:'center'}}>{formik.errors.details}</p>}
                </div>
                <div className="field">
                <Link to="/" className="ui button small teal" >Back</Link>
                <button style={{float: "right"}} className="ui button small teal" type="submit">Submit</button>
                </div>
            </form> 
        </div>
        </>
    )
}

export default EditEvent
