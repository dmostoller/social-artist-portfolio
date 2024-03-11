import React from "react";
import { useParams } from "react-router-dom";



export default function Photo () {

    const {url} = useParams();

    return (
    <>
        <input type="text" name="image_url" value={url}></input>               
    </>  

    )


}