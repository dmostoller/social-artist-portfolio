import React, {useState, useEffect} from "react";
import PaintingsList from "./PaintingsList";
import Search from "./Search";
import { Link } from "react-router-dom";
import { useUser } from "../context/user";
import { useAdmin } from "../context/admin.js"

function PaintingsPage () {
    const { user } = useUser()
    const { isAdmin } = useAdmin()
    const [paintings, setPaintings] = useState([])
    const [searchQ, setSearchQ] = useState("")
    const [sortBy, setSortBy] = useState("Default")

    useEffect(() => {
      fetch(`/paintings`)
      .then((res) => res.json())
      .then((paintings) => {setPaintings(paintings)})
    }, []);

    const searchResults = paintings
    .filter(painting => {
        return (
            painting.title.toLowerCase().includes(searchQ.toLowerCase())        
        )
    })
    if (sortBy === "Small"){
        (searchResults.sort((a, b) => (a.width*a.height) < (b.width*b.height) ? -1 : 1))
    } else if (sortBy === "Large"){
       (searchResults.sort((a, b) => (a.width*a.height) > (b.width*b.height) ? -1 : 1))
    }

    const handleSortBy = (e) => {
        setSortBy(e.target.value)
    }

    return (
        <div className="ui container fluid">
            <div className="ui container fluid">
                <Search searchQ={searchQ} onSearch={setSearchQ} selected={sortBy} sortBy={handleSortBy}/>
                {(user && isAdmin) ? 
                    <div style={{textAlign: "right"}} className="ui container">   
                        <Link to="/paintings/new" className="ui animated fade icon inverted button teal small" tabindex="0">
                            <div className="visible content"><i className="plus icon"></i></div>
                            <div className="hidden content">
                                New
                            </div> 
                        </Link>
                    </div>
                    : <></>
                }
            </div>
            <div className="ui container centered" style={{paddingTop:"40px"}}>
                <PaintingsList paintings={searchResults}/>
            </div>
        </div>
    )
}

export default PaintingsPage