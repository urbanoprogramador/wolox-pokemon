import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    BrowserRouter as Router,
    Routes,
    Navigate,
    Route,
    Outlet,
} from 'react-router-dom';

//pages
import { DetailPage } from '../pages/public/DetailPage';
import { IndexPage } from '../pages/public/IndexPage';
import { Compare } from 'pages/public/ComparePage';
//selector 
import { selectIsPokemons } from './../core/store/pokemons/selectors/selector';
// actions para cargar pokemons
import { asyncLoadPokemon } from 'core/store/pokemons/actions/action';
import { FavoritePage } from 'pages/public/FavoritePage';




const Rutas = () => {


    return (<div>
        <Routes>
            <Route path='/' >

                <Route path='detail/:pokemonId' element={<DetailPage/>}/>
                <Route path='compare' element={<Compare/>}/>
                <Route path='favorite' element={<FavoritePage/>}/>

                <Route index element={<IndexPage />}/>
                <Route
                    path="*"
                    element={<Navigate to="/" replace />}
                />
            </Route>

        </Routes>
    </div>);
}



export const AppRouter = () => {


    const isPokomonloading=useSelector(selectIsPokemons);

    const dispatch=useDispatch();

    useEffect(()=>{
        
        if(!isPokomonloading){
            dispatch(asyncLoadPokemon());
        }
        
    },[isPokomonloading,dispatch]);

    return (
        <Router>
            <Rutas />
            <Outlet />
        </Router>
    )
}
