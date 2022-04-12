import { IMovePokemon } from "core/store/pokemons/pokemonInterface";
import React from "react";

type Props={
    moves:IMovePokemon[]
}

export const DetailMove:React.FC<Props>=({
    moves
})=>{
    return (<>
    <div className="dataTableContent">
            <h5>Movimientos</h5>
            <table className="dataTable">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Url</th>
                    </tr>
                </thead>
                <tbody>
                    {moves.map((type)=>{
                        return (<tr key={type.move.url}>
                            
                            <td>{type.move.name}</td>
                            <td>{type.move.url}</td>
                        </tr>)
                    })}
                </tbody>
            </table>
        </div>
    </>);
}