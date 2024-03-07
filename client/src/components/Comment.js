import React from "react";

function Comment({username, comment,key, id, date_added, comment_user_id, user, onDeleteComment}){

    const handleDeleteComment = (comment) => {
        fetch(`/comments/${id}`,{
          method:"DELETE"
        })
        .then(() => {
          onDeleteComment(comment)
        })
    //   }
    }

    return (
        <div key={key} className="ui comments">
            <div className="comment">
                <div className="content">
                <div className="author">{username}<div className="metadata"><span className="date">{date_added}</span></div></div>
                <div className="text">{comment}</div>

            {user.id == comment_user_id ? 
                <div className="actions">
                <a className="edit">Edit</a>
                <a onClick={handleDeleteComment} className="delete">Delete</a>
            </div>
            : <></>
            }
   
            </div>
        </div>
        </div>
    )
}

export default Comment