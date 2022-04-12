import { selectComparePokemons } from "core/store/pokemons/selectors/selector";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";



export const Sidebar = () => {

    const [open, setOpen] = useState(false);

    const compare=useSelector(selectComparePokemons);

    const active = ({ isActive }) => isActive ? "active" : '';



    return (<div className="contecNav">
        <div className={'topnav' + (open ? ' responsive' : '')} id="myTopnav">
            <NavLink to="/" className={active}  >Inicio</NavLink>
            <NavLink to="/favorite" className={active}>Favoritos</NavLink>
            {/* <NavLink to="/pefil">Perfil</NavLink> */}
            {
                compare.length>=2&&<NavLink className='compare' to="/compare">comparar</NavLink>
            }
            <button className="icon" onClick={() => setOpen(o => !o)} >
                <i className="fa fa-bars"></i>
            </button>
        </div>
    </div>);
}