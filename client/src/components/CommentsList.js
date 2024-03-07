import React, {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

function CommentsList({user, painting_id}){
    const [comments, setComments] = useState([])
    const [isComFormVis, setIsComFormVis] = useState(false)
    function changeIsComFormVis() {
        setIsComFormVis(!isComFormVis)
    }


    useEffect(() => {
        fetch(`/comments`)
       .then((res) => res.json())
       .then((comments) => setComments(comments))
    }, []);

    const deleteComment = (deleted_comment_id) => {
        setComments(comments => comments.filter((comment) => comment.id !== deleted_comment_id))
        console.log(deleted_comment_id)
    }

    const commentsSection = comments
    .filter(comment => comment.painting_id == painting_id)
    .map(comment => (
        <Comment 
            key={comment.id} 
            id={comment.id} 
            username={comment.user.username} 
            comment={comment.comment}
            date_added={comment.date_added} 
            comment_user_id={comment.user_id}
            user={user}
            onDeleteComment={deleteComment}
        />
        ))

    const addComment = (newComment) =>{
        setComments([...comments, newComment])
    }
    
    return (
        <div className="ui container">
            {commentsSection}
            {user ? 
            <div style={{paddingBottom: "25px", paddingTop: "10px"}}>
                {isComFormVis ? <CommentForm user={user} onAddComment={addComment} paintingId={painting_id} onChangeIsComFormVis={changeIsComFormVis} /> : <button onClick={changeIsComFormVis} className="ui button small teal">Add Comment</button>}
            </div>
            : <></>
            }
        </div>
    );
}

export default CommentsList