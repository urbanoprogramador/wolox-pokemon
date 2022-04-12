import React, { useEffect, useState } from "react";
import {  IPokemon, ITypePokemon } from './../../core/store/pokemons/pokemonInterface';
import { useSelector } from 'react-redux';
import { selectWidthTheme } from "core/store/theme/selectors/selector";


interface comparar {
    pokemonId: string[],
    type: ITypePokemon
}


type Props = {
    compare: IPokemon[]
}
export const CompareTypeComponent: React.FC<Props> = ({
    compare
}) => {

    const [moves, setMoves] = useState<comparar[]>([]);

    const widthTheme = useSelector(selectWidthTheme);


    useEffect(() => {
        const unir: comparar[] = [];

        compare.forEach((pokemon) => {
            pokemon.detalle?.types.forEach((type) => {
                let indexUnir: number = -1;
                if (unir.filter((e, index) => {

                    if (e.type.type.name === type.type.name) {
                        indexUnir = index;
                    }
                    return e.type.type.name === type.type.name
                }).length === 0) {
                    unir.push({
                        pokemonId: [pokemon.id],
                        type: type
                    });
                } else {
                    unir[indexUnir].pokemonId.push(pokemon.id);
                }

            });
        });
        setMoves(unir);
    }, [compare, setMoves]);


    return (<div>
        <div className="dataTableContent">
            <h1>Comparar Tipos</h1>
            <table>
                <thead>
                    <tr>
                        <th>
                            name
                        </th>
                        {
                            widthTheme > 600 && <th >
                                url
                            </th>
                        }

                        <th>

                        </th>
                    </tr>
                </thead>
                <tbody className="dataTable">
                    {
                        moves.map((e) => {
                            return (<tr key={e.type.type.url}>
                                <td>
                                    {e.type.type.name}
                                </td>
                                {
                            widthTheme > 600 && <td>
                                    {e.type.type.url}
                                </td>}
                                <td>
                                    {e.pokemonId.map((e) => {
                                        return <img height={80} width={80} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${e}.png`} alt='pokemon' />
                                    })}
                                </td>
                            </tr>);
                        })
                    }
                </tbody>
            </table>
        </div>
    </div>);
}

