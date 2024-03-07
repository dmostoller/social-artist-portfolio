import React from "react";
import { NavLink, Link } from "react-router-dom";

function Header({ user, onLogout}) {
  function handleLogout() {
    fetch("/logout", {
      method: "DELETE",
    }).then(() => onLogout());
  }

   return ( 
    <header className="ui container fluid">
      <div style={{borderBottomLeftRadius: "5px", borderBottomRightRadius: "5px",backgroundColor: "#505050", textAlign:"left"}}>
          <h1 style={{color: "white", padding: "25px"}}>Yasmin Mostoller
          {user ? (
            <> 
               <button onClick={handleLogout} className="ui inverted basic button small" style={{float: "right", marginRight: "5px", marginTop: "5px"}}>Logout</button>
            </>
               ) : (
              <>
                <Link to='/login' className="ui inverted basic button small" style={{float: "right", marginRight: "5px", marginTop: "5px"}}>Login</Link>
                <Link to='/signup' className="ui inverted basic button small" style={{float: "right", marginRight: "5px", marginTop: "5px"}}>Sign Up</Link>
              </>
              )
              }
          </h1>
          {/* {user ? ( <><div style={{color:"red", float: "right", paddingRight: "5px", paddingBottom: "5px"}}>Welcome {user.username}!</div></>) : (<></>)} */}
      </div>
      <div className="ui five item menu">
        <NavLink to="/" className="item" >Home</NavLink>
        <NavLink to="/about" className="item" >About Me</NavLink>
        <NavLink to="/paintings" className="item" >Paintings</NavLink>
        <NavLink to="/events" className="item" >Events</NavLink>
        <NavLink to="/contact" className="item" >Contact</NavLink>
      </div>
    </header>
    )
}

export default Header