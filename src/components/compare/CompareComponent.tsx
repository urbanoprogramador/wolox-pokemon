import React from "react";
import { IPokemon } from './../../core/store/pokemons/pokemonInterface';
import { CompareMoveComponent } from "./CompareMoveComponent";
import { CompareTypeComponent } from "./CompareTypeComponent";
import { HeaderCompare } from "./HeaderCompare";

type Props={
    compare:IPokemon[]
}

export const CompareComponent:React.FC<Props>=({compare})=>{


    return(<>
    <HeaderCompare compare={compare} />
    <CompareTypeComponent compare={compare} />
    <CompareMoveComponent compare={compare} />
    </>);
}