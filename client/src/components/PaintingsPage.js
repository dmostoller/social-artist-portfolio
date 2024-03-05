import React, {useState, useEffect} from "react";
import PaintingsList from "./PaintingsList";
import Search from "./Search";

function PaintingsPage () {

    const [paintings, setPaintings] = useState([])
    const [searchQ, setSearchQ] = useState("")
    const [sortBy, setSortBy] = useState("Default")

    

    useEffect(() => {
      fetch(`${process.env.REACT_APP_API_URL}/paintings`)
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
       //console.log(e.target.value)
        setSortBy(e.target.value)
    }

    return (
        <div className="ui container">
            <div className="ui container">
                <Search searchQ={searchQ} onSearch={setSearchQ} selected={sortBy} sortBy={handleSortBy}/>
            </div>
            <div className="ui container" style={{paddingTop:"40px"}}>
                <PaintingsList paintings={searchResults} />
            </div>
        </div>
    )
}

export default PaintingsPage