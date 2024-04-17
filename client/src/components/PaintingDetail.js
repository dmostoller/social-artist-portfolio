import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Link, useNavigate} from "react-router-dom";
import CommentsList from "./CommentsList";
import { useUser } from "../context/user";
import { useAdmin } from "../context/admin.js"

function PaintingDetail(){
    const { user } = useUser()
    const { isAdmin } = useAdmin()
    const [painting, setPainting] = useState({})
    const {id} = useParams();
    const navigate = useNavigate()
    
    useEffect(() => {
        fetch(`/paintings/${id}`)
        .then((res) => res.json())
        .then((painting) => setPainting(painting))
    }, [id]);

    const handleDeletePainting = (e) => {
        if (window.confirm("Are you sure you want to delete this painting?")) {
        fetch(`/paintings/${id}`, {
            method: "DELETE"
            })
            .then(() => {
                navigate('/paintings') 
            })
        }
    }    
    return (
        <div className="ui container">
            <div className="ui container" style={{width:"80%"}}>
                <div>
                    <div className="image">
                        <img src={painting.image} alt={painting.title} style={{width:"100%", margin:"auto", borderRadius:"5px"}}></img>
                    </div>
                    <div className="content">
                            <div className="header"><h2>{painting.title}</h2></div>
                            <div className="description">{painting.materials}</div>
                            <div className="description">{painting.width}" x {painting.height}"</div>
                            <div className="description">
                                {painting.sold ? "SOLD" : <Link to="/contact">{painting.price}</Link>}
                            </div>
                            <div style={{paddingBottom: "10px", paddingTop: "10px"}} className="ui container"> 
                                <Link to="/paintings" className="ui button inverted small teal" >Back</Link>
                                { isAdmin && (
                                    <>
                                    <div style={{float: "right"}} className="ui buttons">
                                        <Link to={`/paintings/${id}/edit`} className="ui icon inverted button small teal">
                                            <i className="edit icon" style={{visibility: "visible"}}></i>
                                            Edit
                                        </Link>
                                        <div class="or"></div>
                                        <div className="ui inverted icon button small teal" onClick={handleDeletePainting}>
                                            <i class="trash icon" style={{visibility: "visible"}}></i>
                                            Delete
                                        </div>
                                    </div>
                                    </>
                                    )   
                                }
                            </div>
                    </div>
                </div> 
            </div>
            
            <div style={{width:"80%"}} className="ui container">
                    <h3 style={{paddingTop: "15px"}}className="ui dividing header">Comments</h3>  
                    <div><CommentsList user={user} painting_id={painting.id}/></div>          
            </div>
            
        </div>
    );
}

export default PaintingDetail