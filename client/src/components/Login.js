import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Error from "../styles/Error.js"

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => onLogin(user));
        navigate('/');
      } else {
        // r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <div className="ui container">
        <form style={{width:"50%", margin:"auto", padding:"25px"}} className="ui form" onSubmit={handleSubmit}>
            <div className="field">
                <label>Login</label>
                <input type="text" 
                  id="username" 
                  name="username" 
                  value={username} 
                  placeholder="Username..." 
                  onChange={(e) => setUsername(e.target.value)}
                  >    
                </input>
            </div>
            <div className="field">
                <input type="password" 
                  id="password" 
                  name="password" 
                  value={password} 
                  placeholder="Password..." 
                  onChange={(e) => setPassword(e.target.value)}
                  >
                </input>               
            </div>    
            <div className="field">
                <Link to="/" className="ui button small teal">Back</Link>
                <button style={{float: "right"}} className="ui button small teal" type="submit">
                    {isLoading ? "Loading..." : "Login"}
                </button>
            </div>
            <div>
            {errors.map((err) => (
                <Error key={err}>{err}</Error>
            ))}
            </div>
        </form> 
    </div>
)
}

export default LoginForm