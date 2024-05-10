import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { useUser } from "../context/user";
import { DropdownMenu, Dropdown, Menu } from 'semantic-ui-react'


function Header({ onLogout}) {
    const { user } = useUser()

  function handleLogout() {
    fetch("/logout", {
      method: "DELETE",
    }).then(() => onLogout());
  }

  const [deviceSize, setDeviceSize] = useState(window.innerWidth);

  useEffect(() => {
    const resizeW = () => setDeviceSize(window.innerWidth);
    window.addEventListener("resize", resizeW); // Update the width on resize
    return () => window.removeEventListener("resize", resizeW);
  });

// console.log(deviceSize)
   return ( 


    <Menu className='ui top fixed menu'>
    {(deviceSize <= 768) && 
            <>
            <Dropdown     
            icon='hamburger'
            style={{padding: "1em"}}
            floating
            className='dropdown icon'>
                <DropdownMenu>
                    <NavLink to="/" className="item" >Home</NavLink>
                    <NavLink to="/about" className="item" >About Me</NavLink>
                    <NavLink to="/paintings" className="item" >Paintings</NavLink>
                    <NavLink to="/events" className="item" >Events</NavLink>
                    <NavLink to="/contact" className="item" >Contact</NavLink>
                </DropdownMenu>
            </Dropdown>
            </>
        }
        <div className="item">
            YASMIN MOSTOLLER
        </div> 
        {(deviceSize > 768) &&
        <>
        <NavLink to="/" className="item" >Home</NavLink>
        <NavLink to="/about" className="item" >About Me</NavLink>
        <NavLink to="/paintings" className="item" >Paintings</NavLink>
        <NavLink to="/events" className="item" >Events</NavLink>
        <NavLink to="/contact" className="item" >Contact</NavLink>
        </> 
        }
        <div className='right menu'>
            <div className="item">
                { !user ? (
                    <>
                    <Link to='/login' style={{marginRight: '3px'}} data-tooltip="Login" data-position="bottom center" className="ui circular teal icon button small">
                        <i className="sign in alternate icon"></i>
                    </Link>
                    <Link to='/signup' style={{marginRight: '3px'}} data-tooltip="Sign Up" data-position="bottom right" className="ui circular teal icon button small">
                        <i className="plus icon"></i>
                    </Link>
                    </>
                ) : (
                    <>
                    <button onClick={handleLogout} style={{marginRight: '3px'}} data-inverted="" data-tooltip="Logout" data-position="bottom center" className="ui circular teal icon button small">
                        <i className="sign out alternate icon"></i>
                    </button>
                    <Link to='/user' style={{marginRight: '3px'}} data-inverted="" data-tooltip="User Profile" data-position="bottom right" className="ui circular teal icon button small">
                        <i className="user icon"></i>
                    </Link>
                    </>
                )
                }
            </div>
        </div>
    </Menu>
    
    )
}

export default Header