import { ITypePokemon } from "core/store/pokemons/pokemonInterface";

import React from "react"


type Props = {
    types: ITypePokemon[]
}


export const DetailType: React.FC<Props> = ({
    types
}) => {

    return (<>
        <div className="dataTableContent">
            <h5>Tipos</h5>
            <table className="dataTable">
                <thead>
                    <tr>
                        <th>Slot</th>
                        <th>Name</th>
                        <th>Url</th>
                    </tr>
                </thead>
                <tbody>
                    {types.map((type)=>{
                        return (<tr key={type.type.url}>
                            
                            <td>{type.slot}</td>
                            <td>{type.type.name}</td>
                            <td>{type.type.url}</td>
                        </tr>)
                    })}
                </tbody>
            </table>
        </div>
    </>);

}