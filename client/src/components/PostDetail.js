import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Link} from "react-router-dom";

function PostDetail(){
    const [post, setPost] = useState({})
    const {id} = useParams();
    
    useEffect(() => {
        fetch(`/posts/${id}`)
        .then((res) => res.json())
        .then((post) => setPost(post))
    }, [id]);

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
                </div>
            </div>
    </div>
    </div>
    
    );
}

export default PostDetail