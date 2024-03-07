import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";


function SignUp({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const formSchema = yup.object().shape({
    username: yup.string().required("Must enter a username"),
    password: yup.string().required("Must enter a password"),
    password_confirmation: yup.string().required("Must enter password again"),
    email: yup.string().email().required("Must enter an email"),
})
const formik = useFormik({
  initialValues: {
      username:'',
      password:'',
      password_confirmation:'',
      email:'',
  },
validationSchema: formSchema,
onSubmit: (values) => {
  fetch("/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  }).then((r) => {
    if (r.ok) {
      r.json().then(user => {
        setUser(user)
        navigate('/')
    })
    } else {
        r.json().then(error => setError(error.message))
    }
  })
},
})

  return (
    <div className="ui container">
        <form style={{width:"50%", margin:"auto", padding:"25px"}} className="ui form" onSubmit={formik.handleSubmit}>
            <div className="field">
                <label>Login</label>
                <input type="text" 
                  id="username" 
                  name="username" 
                  value={formik.values.username} 
                  placeholder="Username..." 
                  onChange={formik.handleChange}
                  >    
                </input>
            </div>
            <div className="field">
                <input type="password" 
                  id="password" 
                  name="password" 
                  value={formik.values.password} 
                  placeholder="Password..." 
                  onChange={formik.handleChange}
                  >
                </input>
             </div>   
              <div className="field">
                <input type="password" 
                  id="password" 
                  name="password_confirmation" 
                  value={formik.values.passwordConfirmation} 
                  placeholder="Password Confirmation..." 
                  onChange={formik.handleChange}
                  >
                </input>                
            </div>
            <div className="field">
                <input type="text" 
                  id="email" 
                  name="email" 
                  value={formik.values.email} 
                  placeholder="Email Address..." 
                  onChange={formik.handleChange}
                  >
                </input>                
            </div>    
            <div className="field">
                <Link to="/" className="ui button small teal">Back</Link>
                <button style={{float: "right"}} className="ui button small teal" type="submit">
                    Submit
                </button>
            </div>
            {/* <div>
            {errors.map((err) => (
                <Error key={err}>{err}</Error>
            ))}
            </div> */}
        </form> 
    </div>
)
}

export default SignUp;
