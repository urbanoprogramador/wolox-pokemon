import React from "react";
import { Layout } from "core/template/Layout";
import { useSelector } from "react-redux";
import { selectComparePokemons } from 'core/store/pokemons/selectors/selector';
import { useNavigate } from "react-router";
import { Message } from "core/template/alert/Message";
import { CompareComponent } from "components/compare/CompareComponent";



export const Compare = () => {
    const navigate = useNavigate();
    const compare = useSelector(selectComparePokemons);
    return (<Layout>
        {
            compare.length >= 2 ?
            <CompareComponent compare={compare} /> :
                <Message title='Debe comprar al menos dos pokemones' ActionComponent={() => <>
                    <button className="btn black" onClick={() => { navigate('/') }}>Accept</button>
                </>
                } />

        }
    </Layout>);
}