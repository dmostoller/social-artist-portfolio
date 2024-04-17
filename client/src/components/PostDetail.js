import React, {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {Link} from "react-router-dom";
import { useUser } from "../context/user";
import { useAdmin } from "../context/admin.js"

function PostDetail(){
    const { user } = useUser()
    const { isAdmin } = useAdmin()
    const [post, setPost] = useState({})
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`/posts/${id}`)
        .then((res) => res.json())
        .then((post) => setPost(post))
    }, [id]);

    const handleDeletePost = (e) => {
        if (window.confirm("Are you sure you want to delete this post?")) {
        fetch(`/posts/${id}`, {
            method: "DELETE"
            })
            .then(() => {
                // deletePost(post)
                navigate('/') 
            })
        }
    }    
    return (
        <div className="ui container" style={{minHeight:"100vh"}}>
        <div style={{width: "80%", margin: "auto"}} className="ui card">
            <div className="image">
                <img src={post.image_url} className="ui medium image"  alt={post.title}></img>
            </div>
            <div className="content">
                <div className="header">
                    {post.title}
                </div>
                <div className="meta">
                    <span className="category">{post.date_added}</span>
                </div>
                <div className="description">
                    <p>{post.content}</p>
                </div>
                <div style={{padding: "10px"}}> 
                    <Link to="/" className="ui basic button small teal">Back</Link>
                    { user && isAdmin ? (
                                    <>
                                        <button style={{float: "right"}} className="right attached ui icon basic button small teal" onClick={handleDeletePost}>
                                            <i class="trash icon" style={{visibility: "visible"}}></i>
                                            Delete Post
                                        </button>
                                        <Link to={`/posts/${id}/edit`} style={{float: "right"}} className="ui left attached basic button small teal">
                                            <i className="edit icon" style={{visibility: "visible"}}></i>
                                            Edit Post
                                        </Link>
                                    </>
                                    )
                                    : <></>    
                                }
                </div>
            </div>
    </div>
    </div>
    
    );
}

export default PostDetail