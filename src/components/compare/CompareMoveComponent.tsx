import React, { useEffect, useState } from "react";
import { IMovePokemon, IPokemon } from './../../core/store/pokemons/pokemonInterface';
import { useSelector } from 'react-redux';
import { selectWidthTheme } from "core/store/theme/selectors/selector";


interface comparar {
    pokemonId: string[],
    move: IMovePokemon
}


type Props = {
    compare: IPokemon[]
}
export const CompareMoveComponent: React.FC<Props> = ({
    compare
}) => {

    const [moves, setMoves] = useState<comparar[]>([]);

    const widthTheme = useSelector(selectWidthTheme);


    useEffect(() => {
        const unir: comparar[] = [];

        compare.forEach((pokemon) => {
            pokemon.detalle?.moves.forEach((move) => {
                let indexUnir: number = -1;
                if (unir.filter((e, index) => {

                    if (e.move.move.name === move.move.name) {
                        indexUnir = index;
                    }
                    return e.move.move.name === move.move.name
                }).length === 0) {
                    unir.push({
                        pokemonId: [pokemon.id],
                        move: move
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
            <h1>Comparar movimientos</h1>
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
                            return (<tr key={e.move.move.url}>
                                <td>
                                    {e.move.move.name}
                                </td>
                                {
                            widthTheme > 600 && <td>
                                    {e.move.move.url}
                                </td>}
                                <td>
                                    {e.pokemonId.map((e) => {
                                        return <img key={e} height={80} width={80} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${e}.png`} alt='pokemon' />
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