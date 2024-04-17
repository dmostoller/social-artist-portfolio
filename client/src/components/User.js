import React, { useState } from "react";
import EditUser from "./EditUser";

export default function User ({user}) {
    const [showEdit, setShowEdit] = useState(false);

    function showEditForm() {
        setShowEdit(!showEdit)
    }


    return (
        <div className="ui middle aligned center aligned grid" style={{minHeight:"100vh"}}>
            {showEdit ? 
            <EditUser setShowEdit={showEditForm}/> 
            :
            <div className="ui container" style={{marginTop: "5px"}}>
                <h4 className="ui horizontal divider">My Account</h4>
                <div className="ui centered grid">
                    <div className="ui card" style={{margin: "25px"}}>
                        <div className="content" style={{padding: "25px"}}>
                            <div className="header">{user.username}</div>
                            <div className="description">{user.email}</div>
                            <div style={{paddingTop: "25px"}}> 
                                <button onClick={showEditForm} className="ui button small teal">Edit User</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }
    </div>
    );
}
