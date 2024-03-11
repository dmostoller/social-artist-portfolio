import React, { useState } from "react";
// import axios from "axios";
import {useParams} from "react-router-dom";

export default function UploadPhoto ({}) {
    const [photo_url, setPhotoUrl] = useState("")
    function handleSubmit(e) {
        e.preventDefault();

        const fileInput = document.querySelector('#file');
        const formData = new FormData();

        formData.append('file', fileInput.files[0]);
        const fetch_config = {
            method: 'POST',
            body: formData,
        }
        fetch("./upload_photo", fetch_config)
          .then((r) => r.json())
           .then((r) => setPhotoUrl(r));
        //    console.log(photo_url.name)
      }

    return ( 
        photo_url ? 
        <>
        <label>Uploaded Photo URL</label>
        <input type="text" style={{width: "300px"}} name="image_url" value={photo_url.name}></input></>  
        :
        <>
            <form style={{width:"60%", margin:"auto", padding:"25px"}} className="ui form" name="upload" onSubmit={handleSubmit}>
            <label>Upload Photo</label>
                <input type="file" name="file" id="file"/>
                <button type="submit" value="upload" className="ui right floated button mini teal" style={{margin: "5px"}}>Upload</button>
            </form>
        </>

    );
}


