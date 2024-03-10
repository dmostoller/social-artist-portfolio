import React from "react";


export default function UploadPhoto () {

    // function handleSubmit(e) {
    //     e.preventDefault();
    //     fetch("/upload", {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({ username }),
    //     })
    //       .then((r) => r.json())
    //       .then((user) => onLogin(user));
    //   }


    return (
        <div className="ui container fluid">
            <div className="ui card" style={{marginBottom: "15px"}}>
                <div className="content" style={{padding: "25px"}}>
                        <div className="header">Upload Photo</div>
                        <form method="post" encType="multipart/form-data">
                            <input type="file" name="file"/>
                            <div style={{paddingTop: "25px", float: "left"}}> 
                                <button type="submit" value="upload" className="ui button small teal">Upload</button>
                            </div>
                        </form>
                </div>
            </div>
        </div>
    );
}


