import { IFetchingState } from "core/store/utils/interfaceReducer";
import { IPokemon } from "../pokemonInterface";

export const selectPokemons = (state:any):IPokemon[] => state.pokemon?.entities;

export const selectComparePokemons = (state:any):IPokemon[] => state.pokemon?.compare;

export const selectFavoritePokemons = (state:any):IPokemon[] => state.pokemon?.favorite;

export const selectPokemonsStatus = (state:any):IFetchingState => state.pokemon?.status;

export const selectIsPokemons = (state:any):boolean => state.pokemon?.entities.length>0;


export const selectPokemonId=(id:string|undefined)=>(state:any):IPokemon|undefined=>{
    const {pokemon}=state;
    if(id){

        return (pokemon.entities as IPokemon[]).find((pokemon:IPokemon)=>pokemon.id===id);
    }
    return undefined;
}



