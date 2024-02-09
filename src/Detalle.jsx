import React from 'react';
import { useEffect, useState } from 'react';
import Cabecera from './cabecera';
import './App.css';

function Detalle({ pokemon }) {
    const [detallePokemon, setDetallePokemon] = useState({});
    const { name } = pokemon.name;

    function peticionDetalles(name) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`)
        .then((response) => response.json())
        .then((data) => {
            setDetallePokemon(prevDetalle => ({...prevDetalle, data}));
            console.log(data);            
        });
        
    }

    useEffect(() => {
        peticionDetalles('bulbasaur');
    }, []);
  return (
    <>
        <Cabecera />
        <div>
            <h1>Detalle</h1>
            <p>{detallePokemon.name}</p>


        </div>
    </>

  )
}

export default Detalle;