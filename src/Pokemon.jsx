import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Cabecera from './cabecera'

import {
    Link
} from "react-router-dom";



function Pokemon() {
    const [offset, setOffset] = useState(0);
    const [pokemons, setPokemons] = useState([]);
    const [detallePokemon, setDetallePokemon] = useState({});
    const [valueInputBuscar, setValueInputBuscar] = useState('');
    const [pokemonBuscado, setPokemonBuscado] = useState(null);

    function peticion() {
        fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=8`)
        .then((response) => response.json())
        .then((data) => setPokemons(prevPokemons => [...prevPokemons, ...data.results]),
                        setOffset(prevOffset => prevOffset + 20),
        )
        
                        
        console.log(pokemons);
    }

    function peticionDetalles(nombre) {
        if (!detallePokemon[nombre]) {
            fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}/`)
            .then((response) => response.json())
            .then((data) => {
                setDetallePokemon(prevDetalle => ({...prevDetalle, [nombre]: data}));
                console.log(data);    

            });
        }
    }

    function buscar(event) {
        event.preventDefault();
        console.log(valueInputBuscar);
        if (valueInputBuscar === '') {
            setPokemonBuscado(valueInputBuscar);
            return;
        }
        peticionDetalles(valueInputBuscar);
        setPokemonBuscado(valueInputBuscar);

    }


    return (
    <>
        <Cabecera />
        <form onSubmit={buscar}>
            <input type="text" value={valueInputBuscar} onChange={(e) => setValueInputBuscar(e.target.value)} placeholder='Buscar...'/>
            <button type="submit">Buscar</button>
        </form>        

        <div className='container'>
            <div  class="container-pokemons">
        
                {pokemons.map((pokemon, index) => {
                    if(pokemonBuscado && pokemon.name !== pokemonBuscado) {
                        return (
                            <div key={index} className="pokemon">
                                <Link to={`/pokemon/${index + 1}`}>
                                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`} alt={pokemon.name} />
                                    <p>{pokemon.name}</p>
                                </Link>
                            </div>
                        )
                    }
                    return (
                        <div key={index} className="pokemon">
                            <Link to={`/pokemon/${index + 1}`}>
                                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`} alt={pokemon.name} />
                                <p>{pokemon.name}</p>
                            </Link>
                        </div>
                    )
                }
                )}
            </div>
        </div>
        <button onClick={peticion}>Cargar más</button>

    
    </>
  )
}

export default Pokemon
