import React from "react";

function Search({searchQ, onSearch, sortBy, selected}) {
    return (
        <div className="ui centered grid">
            <span>
            <div className="ui icon input " style={{marginBottom: "5px"}}>
                <input 
                type="text"
                value={searchQ}
                placeholder="Search..."
                onChange={(e) => onSearch(e.target.value)}
                />
                <i className="search icon"></i>
            </div>
            </span>

            {/* <span>
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
                
            </span> */}
            <span>            
            <select className="ui selection dropdown"
                style={{padding: "5px"}}
                value={selected} // ...force the select's value to match the state variable...
                onChange={sortBy}>
                <option value="Default">-----</option>
                <option value="Small">SM to LG</option>
                <option value="Large">LG to SM</option>
            </select>
            </span>

        </div>
    )
}
export default Search