import React from "react";
import Slider from './Slider.js';
import PostsList from "./PostsList.js";

export default function HomePage ({isAdmin, user}) {

return (
    <div className="ui container fluid">

        {/* <div className="ui container" style={{width: "60%", float:"left", paddingRight:"25px"}}><CarouselContainer /></div> */}
        <div classname="ui container fluid"><Slider /></div>
        <p style={{textAlign: "center", marginBottom: "0px"}}>"To draw, you must close your eyes and sing." <i> -Pablo Picasso</i></p>
        <div classname="ui container fluid"><PostsList user={user} isAdmin={isAdmin}/></div>
    </div>
)
}