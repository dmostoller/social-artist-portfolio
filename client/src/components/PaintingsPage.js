import React, {useState, useEffect} from "react";
import PaintingsList from "./PaintingsList";
import Search from "./Search";
import { Link } from "react-router-dom";

function PaintingsPage ({ user, isAdmin}) {

    const [paintings, setPaintings] = useState([])
    const [searchQ, setSearchQ] = useState("")
    const [sortBy, setSortBy] = useState("Default")

    useEffect(() => {
      fetch(`/paintings`)
      .then((res) => res.json())
      .then((paintings) => {setPaintings(paintings)})
    }, []);

    const deletePainting = (deleted_painting) => setPaintings(paintings => paintings.filter((painting) => painting.id !== deleted_painting.id))

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
       //console.log(e.target.value)
        setSortBy(e.target.value)
    }

    return (
        <div className="ui container fluid">
            <div className="ui container fluid">
                <Search searchQ={searchQ} onSearch={setSearchQ} selected={sortBy} sortBy={handleSortBy}/>
                {(user && isAdmin) ? 
                    <div style={{ textAlign: "right"}} className="ui container">   
                        <Link to="/paintings/new" className="ui button small teal">Add Painting</Link>
                    </div>
                    : <></>
                }
            </div>
            <div className="ui three column grid" style={{paddingTop:"40px"}}>
                <PaintingsList paintings={searchResults} user={user} isAdmin={isAdmin} deletePainting={deletePainting}/>
            </div>
        </div>
    )
}

export default PaintingsPage