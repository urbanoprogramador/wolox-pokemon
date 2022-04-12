import React from 'react';
import { useDispatch, useSelector } from 'react-redux';


//select pokemones
import { selectComparePokemons, selectFavoritePokemons } from 'core/store/pokemons/selectors/selector';

//theme
import { Layout } from 'core/template/Layout';
import { Datatable } from 'core/template/datatable/Datatable';
import { useNavigate } from 'react-router';
import { asyncComparePokemon, asyncLoadFavorite } from './../../core/store/pokemons/actions/action';
import { IPokemon } from './../../core/store/pokemons/pokemonInterface';


export const FavoritePage = () => {


    const compare=useSelector(selectComparePokemons);
    const favorite=useSelector(selectFavoritePokemons);

    const navigate = useNavigate();


    const dispatch =useDispatch();

    

    return (<Layout>
        <div style={{ maxWidth: 700, margin: 'auto' }}>
            <Datatable
                data={favorite}
                fieldname={[
                    { fieldname: 'Id', key: 'id' },
                    {
                        fieldname: 'Nombre',
                        key:'name',
                        html: (obj) => {
                            return (<div style={{ textAlign: 'center' }}>
                                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${obj['id']}.png`} alt={obj['name']} />
                                <p>
                                    {obj['name']}
                                </p>

                            </div>)
                        }
                    },
                    {
                        fieldname: 'Aciones', html: (obj:any) => {
                            const isCompare=compare.find(p=>p.id===obj.id) ?true:false


                            return (<div className='btnGroup'>
                                <button className='btn primary' onClick={()=>{
                                    navigate('/detail/'+obj.id);
                                }}>
                                    <i className="fa fa-search-plus" aria-hidden="true"></i>
                                </button>
                                <button className={'btn '+( isCompare ?'black':'') } onClick={()=>{
                                    
                                    dispatch(asyncComparePokemon(obj as IPokemon,isCompare));
                                }}>
                                    <i className="fa fa-check-square" aria-hidden="true"></i>
                                </button>
                                <button className='btn favorite'   onClick={()=>{
                                    dispatch(asyncLoadFavorite(obj as IPokemon,true));
                                }}>
                                    <i className="fa fa-heart" aria-hidden="true"></i>
                                </button>

                            </div>);
                        }
                    },
                ]} />

        </div>
    </Layout>);
}