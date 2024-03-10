import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

export default function EditUser ({id, setUser, showEdit}) {
    const [error, setError] = useState(null);
    const [userToEdit, setUserToEdit] = useState({});


    useEffect(() => {
        fetch(`/user/${id}`)
        .then((res) => res.json())
        .then((user) => setUserToEdit(user))
    }, [id]);

    const formSchema = yup.object().shape({
        username: yup.string()
            .required("Username is required")
            .min(2, 'Username must be more than two characters'),
        email: yup.string()
        .required("Email is required")
        .email("Must be a valid email address")
      })
    
    const initValues = userToEdit
    const formik = useFormik({
        enableReinitialize: true,   
        initialValues: initValues,
        validationSchema: formSchema,
        onSubmit: (values) => {
          fetch(`/users/${id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          }).then((res) => {
            if(res.ok) {
              res.json().then(user => {
                setUser(user)
                showEdit()
              })
            } else {
                res.json().then(error => setError(error.message))
            }
          })
        },
      })

    return (
        <div className="ui container fluid">
            <div className="ui card" style={{marginBottom: "15px"}}>
                <div className="content" style={{padding: "25px"}}>
                    <form className="ui form" onSubmit={formik.handleSubmit}>
                            <div className="field">
                                <input type="text" name="title" value={formik.values.username} onChange={formik.handleChange}></input>
                                {formik.errors && <p style={{color:'red', textAlign:'center'}}>{formik.errors.username}</p>}
                            </div>
                            <div className="field">
                                <input type="text" name="title" value={formik.values.email} onChange={formik.handleChange}></input>
                                {formik.errors && <p style={{color:'red', textAlign:'center'}}>{formik.errors.email}</p>}
                            </div>
                        <div style={{paddingTop: "25px", float: "left"}}> 
                            <button onclick={showEdit} className="ui button small teal">Back</button>
                            <button className="ui button small teal">Submit</button>
                        </div>       
                    </form>

                </div>
            </div>
        </div>
    );
}
