import React from "react";
import { Radio } from 'semantic-ui-react'


function Search({searchQ, onSearch, sortBy, selected, forSale, setForSale}) {

    function toggleForSale() {
        setForSale(!forSale)
    }

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
            <span>
                <Radio toggle label="For Sale" 
                onChange={toggleForSale} 
                style={{padding: "0.5em"}}
                /> 
            </span>
            <span>            
            <select className="ui selection dropdown"
                style={{padding: "5px"}}
                value={selected} // ...force the select's value to match the state variable...
                onChange={sortBy}>
                <option value="Default">-----</option>
                <option value="Small">Small to Large</option>
                <option value="Large">Large to Small</option>
            </select>
            </span>

        </div>
    )
}
export default Search