import React from 'react';
import { useDispatch, useSelector } from 'react-redux';


//select pokemones
import { selectComparePokemons, selectFavoritePokemons, selectPokemons } from 'core/store/pokemons/selectors/selector';

//theme
import { Layout } from 'core/template/Layout';
import { Datatable } from 'core/template/datatable/Datatable';
import { useNavigate } from 'react-router';
import { asyncComparePokemon, asyncLoadFavorite } from './../../core/store/pokemons/actions/action';
import { IPokemon } from './../../core/store/pokemons/pokemonInterface';


export const IndexPage = () => {

    const pokemons = useSelector(selectPokemons);

    const compare=useSelector(selectComparePokemons);
    const favorite=useSelector(selectFavoritePokemons);

    const navigate = useNavigate();


    const dispatch =useDispatch();

    

    return (<Layout>
        <div style={{ maxWidth: 700, margin: 'auto' }}>
            <Datatable
                data={pokemons}
                fieldname={[
                    { fieldname: 'Id', key: 'id' },
                    {
                        key:'name',
                        fieldname: 'Nombre',
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
                            const isFavorite=favorite.find(p=>p.id===obj.id) ?true:false

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
                                <button className={'btn '+( isFavorite ?'favorite':'') }   onClick={()=>{
                                    
                                    dispatch(asyncLoadFavorite(obj as IPokemon,isFavorite));
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