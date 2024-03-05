import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
   return ( 
    <header className="ui container">
      <div style={{borderBottomLeftRadius: "5px", borderBottomRightRadius: "5px",backgroundColor: "#202020", textAlign:"center"}}>
          <img src="https://static.wixstatic.com/media/1d469b_fed699377ff94926952ced8f84ade651~mv2.jpeg/v1/fill/w_219,h_120,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/yasi%20logo%201.jpeg" alt="YasiArt"/>
        </div>
      <div className="ui four item menu">
        <NavLink to="/" className="item" >Home</NavLink>
        <NavLink to="/about" className="item" >About Me</NavLink>
        <NavLink to="/paintings" className="item" >Paintings</NavLink>
        <NavLink to="/contact" className="item" >Contact</NavLink>
      </div>
    </header>
    )
}

export default Header