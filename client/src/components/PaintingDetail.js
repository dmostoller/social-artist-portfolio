import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Link, useNavigate} from "react-router-dom";
import CommentsList from "./CommentsList";
import { useUser } from "../context/user";
import { useAdmin } from "../context/admin.js"
import { Modal } from "semantic-ui-react";
import PaintingModal from "./PaintingModal";

function PaintingDetail(){
    const { user } = useUser()
    const { isAdmin } = useAdmin()
    const [painting, setPainting] = useState({})
    const {id} = useParams();
    const navigate = useNavigate()
    const [modalOpen, setModalOpen] = useState(false);

    function handleOpen() {
        setModalOpen(true)
    } 

    function handleClose() {
        setModalOpen(false)
    } 
    
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
            <div className="ui container">
                <div className="ui horizontal card fluid" style={{margin: "10px"}}>
                    <div className="item">
                        <img className="ui large image" src={painting.image} onClick={handleOpen} alt={painting.title} ></img>
                        <Modal
                            open={modalOpen}
                            onClose={handleClose}
                            basic={true}
                            >
                            <PaintingModal painting={painting}/>
                        </Modal>
                    </div>
                    <div className="content">
                        <div className="header"><h2>{painting.title}</h2></div>
                        <div className="description">{painting.materials}</div>
                        <div className="description">{painting.width}" x {painting.height}"</div>
                        <div className="description">
                            {painting.sold ? "SOLD" : <Link to="/contact">{painting.price}</Link>}
                        </div>
                        <div style={{paddingBottom: "10px", paddingTop: "10px"}} className="ui container"> 
                            <Link to="/paintings" className="ui circular button small teal" >Back</Link>
                            { isAdmin && (
                                <>
                                <div style={{float: "right"}} className="ui buttons">
                                    <Link to={`/paintings/${id}/edit`} className="ui circular icon button small teal">
                                        <i className="edit icon" style={{visibility: "visible"}}></i>
                                        Edit
                                    </Link>
                                    <div class="or"></div>
                                    <div className="ui circular icon button small teal" onClick={handleDeletePainting}>
                                        <i class="trash icon" style={{visibility: "visible"}}></i>
                                        Delete
                                    </div>
                                </div>
                                </>
                                )   
                            }
                        </div>
                        <div style={{width:"60%"}} className="ui container">
                            <h3 style={{paddingTop: "15px"}}className="ui dividing header">Comments</h3>  
                            <div><CommentsList user={user} painting_id={painting.id}/></div>          
                        </div>
                    </div>
                </div> 
            </div>
        </div>
    );
}

export default PaintingDetail