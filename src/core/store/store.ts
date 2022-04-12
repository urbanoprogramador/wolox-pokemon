import { middlewareReduxInpect} from './middleware/middleware';
import { combineReducers, createStore } from 'redux';
import { userReducer } from './auth/reducers/reducer';
import { themeReducer } from './theme/reducers/reducer';
import { pokemonReducer } from './pokemons/reducers/reducer';


const reducer=combineReducers({
  auth:userReducer,
  pokemon:pokemonReducer,
  theme:themeReducer
})

export const store = createStore(reducer,middlewareReduxInpect);