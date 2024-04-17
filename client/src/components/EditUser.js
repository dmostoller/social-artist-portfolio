import React, { useState, useEffect } from "react";
import { useUser } from "../context/user";
import { useFormik } from "formik";
import * as yup from "yup";

export default function EditUser ({setShowEdit}) {
    const [error, setError] = useState(null);
    const { user, setUser} = useUser();

    const formSchema = yup.object().shape({
        username: yup.string()
            .required("Username is required")
            .min(2, 'Username must be more than two characters'),
        email: yup.string()
        .required("Email is required")
        .email("Must be a valid email address")
      })
    
    const initValues = user
    const formik = useFormik({
        enableReinitialize: true,   
        initialValues: initValues,
        validationSchema: formSchema,
        onSubmit: (values) => {
          fetch(`/update_user/${user.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          }).then((res) => {
            if(res.ok) {
              res.json().then(user => {
                setUser(user)
                setShowEdit()
              })
            } else {
                res.json().then(error => setError(error.message))
            }
          })
        },
      })

    return (
        <div className="ui inverted container" style={{marginTop: "5px"}}>
            <h4 className="ui horizontal divider">My Account</h4>
            <div className="ui centered grid">
                <div className="ui card" style={{margin: "25px"}}>
                    <div className="content" style={{padding: "25px"}}>
                        <form className="ui form" onSubmit={formik.handleSubmit}>
                            <div className="field">
                                <input type="text" id="username" name="username" value={formik.values.username} onChange={formik.handleChange}></input>               
                                    {formik.errors && <p style={{color:'red', textAlign:'center'}}>{formik.errors.username}</p>}
                            </div>
                            <div className="field">
                                <input type="text" id="email" name="email" value={formik.values.email} onChange={formik.handleChange}></input>
                                {formik.errors && <p style={{color:'red', textAlign:'center'}}>{formik.errors.email}</p>}
                            </div>
                            <div className="field">
                        <div className="ui left icon input">
                            <i className="lock icon"></i>
                            <input type="password" 
                                id="password" 
                                name="password" 
                                value={formik.values.password} 
                                placeholder="Password..." 
                                onChange={formik.handleChange}
                            >
                            </input>
                        </div>
                            {formik.errors && <p style={{color:'red', textAlign:'center'}}>{formik.errors.password}</p>}
                        </div>   
                        <div className="field">
                        <div className="ui left icon input">
                            <i className="lock icon"></i>
                            <input type="password" 
                                id="password" 
                                name="password_confirmation" 
                                value={formik.values.password_confirmation} 
                                placeholder="Password Confirmation..." 
                                onChange={formik.handleChange}
                            >
                            </input>
                        </div>
                            {formik.errors && <p style={{color:'red', textAlign:'center'}}>{formik.errors.password_confirmation}</p>}                    
                        </div>
                            <div style={{paddingTop: "25px"}}> 
                                <button onClick={setShowEdit} className="ui button basic small teal">Back</button>
                                <button className="ui button small teal">Submit</button>
                            </div>       
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
