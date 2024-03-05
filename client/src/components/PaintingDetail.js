import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Link} from "react-router-dom";
import CommentsList from "./CommentsList";

function PaintingDetail(){
    const [painting, setPainting] = useState({})
    const {id} = useParams();
    
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/paintings/${id}`)
        .then((res) => res.json())
        .then((painting) => setPainting(painting))
    }, [id]);

    if (!painting) {return <div>Loading...</div>}

    return (
        <div className="ui container">
            <div className="ui container" style={{width:"90%"}}>
                <div>
                    <div className="image">
                        <img src={painting.fullsize} alt={painting.title} style={{width:"100%", margin:"auto", borderRadius:"5px"}}></img>
                    </div>
                    <div className="content">
                            <div className="header"><h2>{painting.title}</h2></div>
                            <div className="description">{painting.materials}</div>
                            <div className="description">{painting.width}" x {painting.height}"</div>
                            <div className="description">
                                {painting.sold ? "SOLD" : <Link to="/contact">{painting.price}</Link>}
                            </div>
                            <div style={{paddingBottom: "10px", paddingTop: "10px"}} className="ui container"> 
                                <Link to="/paintings" className="ui button small teal" >Back</Link>
                            </div>
                    </div>
                </div> 
            </div>
            
            <div style={{width:"90%"}} className="ui container">
                    <h1 className="ui dividing header">Comments</h1>  
                    <div><CommentsList /></div>          
            </div>
            
        </div>
    );
}

export default PaintingDetail