import React from "react";

export default function Slider () {
    return ( 
        <div className="ui three column grid" style={{marginBottom: "5px"}}> 
            <div className="column">
                <div className="ui fluid card">
                    <div className="image">
                        <img src="/images/Yasi-1.jpg" alt="Yasmin Mostoller"></img>
                    </div>
                </div>
            </div>
            <div className="column">
                <div className="ui fluid card">
                    <div className="image">
                        <img src="/images/Yasi-2.jpg" alt="Yasmin Mostoller"></img>
                    </div>
                </div>
            </div>
            <div className="column">
                <div className="ui fluid card">
                    <div className="image">
                        <img src="/images/Yasi-4.jpg" alt="Yasmin Mostoller"></img>
                    </div>
                </div>
            </div>
        </div>
    );
}
