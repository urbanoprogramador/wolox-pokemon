import React, { useEffect } from "react";
import { IPokemon } from "core/store/pokemons/pokemonInterface";
import { useDispatch } from 'react-redux';
import { asyncLoadPokemonDetailPokemon } from "core/store/pokemons/actions/action";
import { DetailHeader } from "./DetailHeader";
import { DetailType } from "./DetailType";
import { DetailMove } from "./DetailMove";
import { DetailStats } from "./DetailStats";

type Props = {
    pokemon: IPokemon
}

export const DetailPokemon: React.FC<Props> = ({ pokemon }) => {

    const dispatch = useDispatch();

    useEffect(() => {
        if (!pokemon.detalle) {
            dispatch(asyncLoadPokemonDetailPokemon(pokemon));
        }
    }, [pokemon,dispatch]);



    return (<>

        <DetailHeader id={pokemon.id} name={pokemon.name} height={pokemon.detalle?.height || 0} weight={pokemon.detalle?.weight || 0} />
        <div className="container">
            <div className="row2"><DetailType types={pokemon.detalle?.types || []} /></div>
            <div className="row2"><DetailStats stats={pokemon.detalle?.stats || []} /></div>
            <div className="row2"><DetailMove moves={pokemon.detalle?.moves || []} /></div>
        </div>




    </>);
}