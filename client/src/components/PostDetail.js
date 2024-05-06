import React, {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {Link} from "react-router-dom";
import { useUser } from "../context/user";
import { useAdmin } from "../context/admin.js"
import { Modal } from "semantic-ui-react";
import PostModal from "./PostModal.js";


function PostDetail(){
    const { user } = useUser()
    const { isAdmin } = useAdmin()
    const [post, setPost] = useState({})
    const {id} = useParams();
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);

    function handleOpen() {
        setModalOpen(true)
    } 

    function handleClose() {
        setModalOpen(false)
    } 

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
        <div style={{width: "100%", margin: "auto"}} className="ui horizontal card">
            <div className="image" style={{minWidth: "400px"}}>
                <img src={post.image_url} 
                className="ui medium image"  
                style={{minWidth: "400px"}}
                onClick={handleOpen}  
                alt={post.title}>
                </img>
                <Modal
                    open={modalOpen}
                    onClose={handleClose}
                    basic={true}
                    >
                    <PostModal image={post.image_url} title={post.title}/>
                </Modal>
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
                    <Link to="/" className="ui circular icon button small teal">
                    <i className="undo icon"></i>
                    </Link>
                    { user && isAdmin ? (
                                    <>
                                        <Link to={`/posts/${id}/edit`} className="ui circular icon button small teal">
                                            <i className="edit icon"></i>
                                        </Link>
                                        <div className="ui circular icon button small teal" onClick={handleDeletePost}>
                                            <i class="trash icon" style={{visibility: "visible"}}></i>
                                        </div>
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