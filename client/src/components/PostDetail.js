import React, {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {Link} from "react-router-dom";

function PostDetail({user, isAdmin}){
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
        <div className="ui container">
        <div style={{width: "75%", margin: "auto"}} className="ui card">
            <div className="image">
                <img className="ui huge image" src={post.image_url} alt={post.title}></img>
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
                    <Link to="/" className="ui button small teal">Back</Link>
                    { (user && isAdmin) ? (
                        <>
                            <button style={{float: "right"}}className="ui icon button small teal" onClick={handleDeletePost}>
                            <i class="trash icon" style={{visibility: "visible"}}></i>
                            </button>
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