import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

function CommentsList(){
    const [comments, setComments] = useState([])
    const {id} = useParams();
    const [isComFormVis, setIsComFormVis] = useState(false)
    function changeIsComFormVis() {
        setIsComFormVis(!isComFormVis)
    }

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/comments`)
       .then((res) => res.json())
       .then((comments) => setComments(comments))
    }, []);

    const commentsSection = comments
    .filter(comment => comment.painting_id == id)
    .map(comment => (
        <Comment 
            key={comment.id} 
            name={comment.name} 
            comment={comment.comment}
            date={comment.date} 
        />
        ))

    const addComment = (newComment) =>{
        setComments([...comments, newComment])
    }

    return (
        <div className="ui container">
            {commentsSection}
            <div style={{paddingBottom: "25px", paddingTop: "10px"}}>
                {isComFormVis ? <CommentForm onAddComment={addComment} paintingId={id} onChangeIsComFormVis={changeIsComFormVis} /> : <button onClick={changeIsComFormVis} className="ui button small teal">Add Comment</button>}
            </div>
        </div>
    );
}

export default CommentsList