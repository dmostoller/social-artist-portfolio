import React from "react";
import CarouselContainer from './CarouselContainer.js';

export default function HomePage () {

return (
    <div className="ui container" style={{height: "65vh"}}>
        <div style={{width: "40%", float:"left", paddingLeft:"50px", paddingTop:"100px"}} className="ui container">
            <h1>Yasmin Mostoller</h1>
            <p>"To draw, you must close your eyes and sing."</p>
            <p style={{fontStyle:"italic"}}>-Pablo Picasso</p>
        </div>
        <div className="ui container" style={{width: "60%", float:"left", paddingRight:"25px"}}><CarouselContainer /></div>
    </div>
)
}