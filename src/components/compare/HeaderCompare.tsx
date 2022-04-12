import React from "react";
import { IPokemon } from './../../core/store/pokemons/pokemonInterface';
type Props = {
    compare: IPokemon[]
}
export const HeaderCompare: React.FC<Props> = ({
    compare
}) => {
    return (<div>
        <div className="listPokemones">
            {compare.map((e) => {
                return (<div className="itemsPokemon" key={e.id}>
                    <div className="datos">
                        <h5>
                            Id {e.id} 
                        </h5>
                        <h5>
                            Nombre {e.name} 
                        </h5>
                        <h5>
                           Peso {e.detalle?.weight} 
                        </h5>
                        <h5>
                           Altura {e.detalle?.height} 
                        </h5>
                    </div>
                    <div  className="datos">
                    <img  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${e.id}.png`} alt={e.name} />
                    </div>
                </div>);
            })}
        </div>
    </div>);
}