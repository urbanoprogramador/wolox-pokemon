import React from 'react';
import { Layout } from 'core/template/Layout';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectPokemonId } from 'core/store/pokemons/selectors/selector';
import { NotFound } from 'components/detail/NotFound';
import { DetailPokemon } from './../../components/detail/DetailPokemon';

export const DetailPage=()=>{

    const {pokemonId}=useParams();

    const pokemon=useSelector(selectPokemonId(pokemonId));
    


    

    return (<Layout>
        {pokemon?<DetailPokemon pokemon={pokemon}/>:<NotFound />}
    </Layout>);
}