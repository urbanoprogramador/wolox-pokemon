import { asyncPokemon, typePokemon } from "../reducers/reducer";
import { asyncMac, mac } from "../../utils/configReducer";
import { IDetallePokemon, IResponsePokemon } from "../pokemonInterface";
import { IActionPokemonEntities, IPokemon } from './../pokemonInterface';

const [
  actionPokemonPending,
  actionPokemonError,
  actionPokemonSuccess
] = asyncMac(asyncPokemon);







export const actionLoadProduct = mac<IActionPokemonEntities>(typePokemon.load);
export const actionLoadCompare = mac<IActionPokemonEntities>(typePokemon.loadCompare);
export const actionLoadFavorite = mac<IActionPokemonEntities>(typePokemon.loadFavorite);





export const asyncLoadPokemon = () => (dispatch: Function) => {

  dispatch(actionPokemonPending());
  fetch('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=5000')
    .then(res => res.json())
    .then((d: IResponsePokemon) => {
      const p = d.results.map<IPokemon>(({ name, url }): IPokemon => {
        const id = url.split('/')[6];
        return {
          name: name,
          id
        }
      });
      dispatch(actionLoadProduct({
        payload: p
      }));
      dispatch(actionPokemonSuccess());
      localStorage.setItem('pokemon', JSON.stringify(p));

    }).catch((error) => {
      dispatch(actionPokemonError({ payload: error.message }));
    }).finally(() => {

    });

}

export const asyncLoadPokemonDetailPokemon = (pokemon: IPokemon) => (dispatch: Function, getState: Function) => {

  const allPokemon = (getState().pokemon.entities) as IPokemon[];

  dispatch(actionPokemonPending());
  fetch('https://pokeapi.co/api/v2/pokemon/' + pokemon.id)
    .then(res => res.json())
    .then((d: IDetallePokemon) => {

      const temporal: IPokemon = {
        ...pokemon,
        detalle: d
      };

      const temporalEnties = allPokemon.map((todo) => {
        if (todo.id === temporal.id) {
          return temporal;
        }
        return todo;
      });

      localStorage.setItem('pokemon', JSON.stringify(temporalEnties));

      dispatch(actionLoadProduct({
        payload: temporalEnties
      }));

    }).catch((error) => {
      //dispatch(actionPokemonError({ payload: error.message }));
    }).finally(() => {

    });



}




export const asyncComparePokemon = (pokemon: IPokemon,isCompare:boolean) => (dispatch: Function, getState: Function) => {
  
  const allPokemon = (getState().pokemon.entities) as IPokemon[];
  const compare = (getState().pokemon.compare) as IPokemon[];
  const tCompare = [ ...compare ];

  if(isCompare){
    dispatch(actionLoadCompare({
      payload: tCompare.filter((e)=>e.id!==pokemon.id)
    }));
    return ;
  }

  

  if (compare.length >= 3) {
    tCompare.shift();
  }
  if (pokemon.detalle) {
    
    tCompare.push(pokemon);

    

    dispatch(actionLoadCompare({
      payload: tCompare
    }));
  } else {
    fetch('https://pokeapi.co/api/v2/pokemon/' + pokemon.id)
      .then(res => res.json())
      .then((d: IDetallePokemon) => {

        const temporal: IPokemon = {
          ...pokemon,
          detalle: d
        };

        const temporalEnties = allPokemon.map((todo) => {
          if (todo.id === temporal.id) {
            return temporal;
          }
          return todo;
        });

        localStorage.setItem('pokemon', JSON.stringify(temporalEnties));

        dispatch(actionLoadProduct({
          payload: temporalEnties
        }));

        tCompare.push(temporal);

        dispatch(actionLoadCompare({
          payload: tCompare
        }));

      }).catch((error) => {
        //dispatch(actionPokemonError({ payload: error.message }));
      }).finally(() => {

      });
  }


}








export const asyncLoadFavorite = (pokemon: IPokemon,isFavorite:boolean) => (dispatch: Function, getState: Function) => {
  
  const allPokemon = (getState().pokemon.entities) as IPokemon[];
  const favorite = (getState().pokemon.favorite) as IPokemon[];
  const tFavorite = [ ...favorite ];

  if(isFavorite){
    dispatch(actionLoadFavorite({
      payload: tFavorite.filter((e)=>e.id!==pokemon.id)
    }));
    return ;
  }

  if (pokemon.detalle) {
    
    tFavorite.push(pokemon);
    dispatch(actionLoadFavorite({
      payload: tFavorite
    }));
  } else {
    fetch('https://pokeapi.co/api/v2/pokemon/' + pokemon.id)
      .then(res => res.json())
      .then((d: IDetallePokemon) => {

        const temporal: IPokemon = {
          ...pokemon,
          detalle: d
        };

        const temporalEnties = allPokemon.map((todo) => {
          if (todo.id === temporal.id) {
            return temporal;
          }
          return todo;
        });

        localStorage.setItem('pokemon', JSON.stringify(temporalEnties));

        dispatch(actionLoadProduct({
          payload: temporalEnties
        }));

        tFavorite.push(temporal);

        dispatch(actionLoadFavorite({
          payload: tFavorite
        }));

      }).catch((error) => {
        //dispatch(actionPokemonError({ payload: error.message }));
      }).finally(() => {

      });
  }


}