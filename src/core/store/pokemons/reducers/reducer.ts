import {combineReducers} from "redux";
import {
  makeCrudReducer,
  makeFetchingReducer,
  mat
} from "../../utils/configReducer";
import { IPokemon } from "../pokemonInterface";


//https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10103.png



const pokemon='[product]';

export const typePokemon={
  load:`${pokemon} load`,
  update:`${pokemon} update`,
  remove:`${pokemon} remove`,
  loadCompare:`${pokemon} loadCompare`,
  loadFavorite:`${pokemon} loadFavorite`
}

const initPokemon=()=>{
  const pokemon=localStorage.getItem('pokemon');
  return pokemon ? JSON.parse(pokemon) as IPokemon[]:[];
}

//const productItemReducer=makeSetReducer<IPokemon>({actions:typeProduct.loadProduct,initialState:{} as IPokemon});
const pokemonsReducer=makeCrudReducer<IPokemon>([
  typePokemon.load,
  typePokemon.update,
  typePokemon.remove
],initPokemon());


const compareReducer=makeCrudReducer<IPokemon>([
  typePokemon.loadCompare
],[]);


export const asyncPokemon = mat(pokemon);
const fetchingAdminReducer=makeFetchingReducer(asyncPokemon);

const favoriteReducer=makeCrudReducer<IPokemon>([
  typePokemon.loadFavorite
],[]);

export const pokemonReducer=combineReducers({
  entities:pokemonsReducer,
  status:fetchingAdminReducer,
  compare:compareReducer,
  favorite:favoriteReducer
});