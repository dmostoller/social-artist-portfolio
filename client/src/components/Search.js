import React from "react";

function Search({searchQ, onSearch, sortBy, selected}) {
    return (
        <div className="ui container">
            <div className="ui icon input ">
                <input 
                type="text"
                value={searchQ}
                placeholder="Search paintings..."
                onChange={(e) => onSearch(e.target.value)}
                />
                <i className="search icon"></i>
            </div>
            <span>
                <label style={{padding:"10px"}}>
                    <input type="radio" value="Default" checked={selected === "Default"} onChange={sortBy} />
                    Unsorted
                </label>
                <label style={{padding:"5px"}}>
                    <input type="radio" value="Small" checked={selected === "Small"} onChange={sortBy} />
                    Smallest to Largest
                </label>
                <label style={{padding:"5px"}}>
                    <input type="radio" value="Large" checked={selected === "Large"} onChange={sortBy} />
                    Largest to Smallest
                </label>
            </span>
        </div>
    )
}
export default Search