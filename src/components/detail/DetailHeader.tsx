import React from "react";

type Props={
    weight: number
    height: number
    id: string
    name: string
}

export const DetailHeader: React.FC<Props>=({
    weight,
    height,
    id,
    name
})=>{


    return (<>
    <div className="header">
        <div className="pd ">
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} alt={name} />
            <h4>
                {name} <span >Peso:{weight}</span> <span>Altura:{height}</span>
            </h4>
        </div>
    </div>
    
    </>);
}