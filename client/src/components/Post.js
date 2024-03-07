import React from "react";
import {Link, useNavigate } from "react-router-dom";


export default function Post ({id, title, content, image_url, date_added, isAdmin, deletePost}) {
    const navigate = useNavigate()

    const handleDeletePost = (post) => {
        if (window.confirm("Are you sure you want to delete this post?")) {
        fetch(`/posts/${id}`, {
            method: "DELETE"
            })
            .then(() => {
                deletePost(post)
                navigate('/') 
            })
        }
    }    


    return (
        <div className="ui container fluid">
            <div className="ui horizontal card fluid" style={{marginBottom: "15px"}}>
                <div className="image" style={{minWidth: "300px"}}>
                    <img src={image_url} alt={title} style={{minWidth: "300px"}}></img>
                </div>
                <div className="content" style={{padding: "25px"}}>
                    <div className="header">{title}</div>
                    <div className="meta">{date_added}</div> 
                    <div className="description">{content}</div>
                    <div style={{paddingTop: "25px", float: "left"}}> 
                        <Link to={`/posts/${id}`}  className="ui button small teal">Read More</Link>
                    </div>
                    { isAdmin ? (
                        <div style={{paddingTop: "25px", float: "left"}}> 
                            <button className="ui icon button small teal" onClick={handleDeletePost}>
                            <i class="trash icon" style={{visibility: "visible"}}></i>
                            </button>
                        </div>
                    )
                    : <></>    
                }
                </div>
            </div>
        </div>
    );
}
