import React from "react";
import { Link } from "react-router-dom";


export default function AboutPage () {

return (
    <div className="ui container">
    <div style={{width: "75%", margin: "auto"}} className="ui card">
        <div className="image">
            <img className="ui huge image" src="./images/slider-2.jpg" alt="Yasmin Mostoller at the Jed William's Gallery"/>
        </div>
        <div className="content">
            <div className="header">
                Yasmin Mostoller
            </div>
            <div className="meta">
                <span className="category">Philadelphia, PA</span>
            </div>
            <div className="description">
                <p>A trained artist with a Master's degree in Fine Arts originally from Tehran, Iran and now living in Philadelphia, Pennsylvania. My paintings are colorful, abstract, geometric, and imaginative works that are a window into my creative mind. Thank you for visiting my website.</p>
            </div>
            <div>
                <a href="https://www.facebook.com/yasminmostollerart" target="none"><img style={{float: "left", padding:"5px"}} src="./icons/facebook.svg" alt="Facebook"></img></a>
                <a href="https://www.instagram.com/yasminnunsy/" target="none"><img style={{float: "left", padding:"5px"}} src="./icons/instagram.svg" alt="Instagram"></img></a>
            </div>
            <div style={{padding: "10px", float: "right"}}> 
                <Link to="/contact" className="ui button small teal">Contact Me</Link>
            </div>
        </div>
</div>
</div>




)
}