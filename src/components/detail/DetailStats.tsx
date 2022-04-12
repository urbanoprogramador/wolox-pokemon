import { IStatsPokemon } from "core/store/pokemons/pokemonInterface";
import React from "react";

type Props ={
    stats:IStatsPokemon[]
}

export const DetailStats:React.FC<Props>=({
    stats
})=>{
    return (<>
       <div className="dataTableContent">
            <h5>Stats</h5>
            <table className="dataTable">
                <thead>
                    <tr>
                        <th>base_stat</th>
                        <th>effort</th>
                        <th>effort</th>
                        <th>effort</th>
                    </tr>
                </thead>
                <tbody>
                    {stats.map((stat)=>{
                        return (<tr key={stat.stat.url}>
                            
                            <td>{stat.base_stat}</td>
                            <td>{stat.effort}</td>
                            <td>{stat.stat.name}</td>
                            <td>{stat.stat.url}</td>
                        </tr>)
                    })}
                </tbody>
            </table>
        </div>
    </>);
}