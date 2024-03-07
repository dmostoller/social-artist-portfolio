import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

function AddEvent() {
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const formSchema = yup.object().shape({
        name: yup.string().required("Must enter a title"),
        venue: yup.string().required("Must enter a venue"),
        location: yup.string().required("Must enter a location"),
        details: yup.string().required("Must enter event details"),
        image_url: yup.string().link().required("Must enter an image link"),
        event_date: yup.date().required("Must enter a date"),
        event_link: yup.string().link().required("Must enter an event link"),
    })
    const formik = useFormik({
        initialValues: {
          name:'',
          venue:'',
          location:'',
          details:'',
          image_url:'',
          event_date:'',
          event_link:'',
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
          fetch("/events/new", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          }).then((res) => {
            if(res.ok) {
              res.json().then(event => {
                // onAddEvent(event)
                navigate(`/events`)
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
                </div>
                <div className="field">
                    <input type="text"  name="venue" value={formik.values.venue} placeholder="Venue..." onChange={formik.handleChange}></input>               
                </div>    
                <div className="field">
                    <input type="text" name="location" value={formik.values.location} placeholder="Location address..." onChange={formik.handleChange}></input>               
                </div>    
                <div className="field">
                    <input type="text"  name="image_url" value={formik.values.image_url} placeholder="Image link..." onChange={formik.handleChange}></input>               
                </div>    
                <div className="field">
                    <input type="text"  name="event_date" value={formik.values.event_date} placeholder="Event Date (MM/DD/YYYY)..." onChange={formik.handleChange}></input>               
                </div>  
                <div className="field">
                    <input type="text"  name="event_link" value={formik.values.event_link} placeholder="Link to Event..." onChange={formik.handleChange}></input>               
                </div>      
                <div className="field">
                    <textarea type="text" name="details" value={formik.values.details} placeholder="Event Details..." onChange={formik.handleChange}></textarea>               
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

export default AddEvent


    
    // const [formData, setFormData] = useState(initialState)

    // function handleChange(e) {
    //     //console.log(e.target.value)
    //     setFormData({...formData, [e.target.name]: e.target.value})
    // }

    // function handleAddNewEvent(e){
    //     e.preventDefault()
    //     if(window.confirm("Are you sure you're ready to submit?")) {
    //     setFormData({...formData})
    //     fetch("/events/new", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify({...formData})
    //     })
    //         .then((res) => res.json())
    //         .then((newEvent) => {
    //             navigate('/events')
    //         })
    //     setFormData(initialState)
    //     }
    // }