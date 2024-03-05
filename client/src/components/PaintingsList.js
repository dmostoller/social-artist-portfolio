import React from "react";
import Painting from "./Painting";

function PaintingsList ({paintings}) {
    const gallery = paintings.map((painting) => {
        return <Painting 
        key={painting.id}
        id={painting.id} 
        image={painting.image} 
        title={painting.title}
        price={painting.price}
        height={painting.height}
        width={painting.width}
        materials={painting.materials}
        sold={painting.sold}
        />
    })
    return (
 
        <div className="ui grid">{gallery}</div>
 
    )
}

export default PaintingsList