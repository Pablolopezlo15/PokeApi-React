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
        fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=9`)
            .then((response) => response.json())
            .then((data) => {
                setPokemons(prevPokemons => [...prevPokemons, ...data.results]);
                setOffset(prevOffset => prevOffset + 20);
    
                // Hacer una petición de los detalles de cada Pokémon
                data.results.forEach(pokemon => {
                    peticionDetalles(pokemon.name);
                });
            });
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

    useEffect(() => {
        peticion();
    }, []);


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
                const detalles = detallePokemon[pokemon.name];
                return (
                    <div key={index} className="pokemon">
                        <Link to={`/pokemon/${index + 1}`}>
                            <img src={detalles ? detalles.sprites.front_default : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`} alt={pokemon.name} />
                            <p>{pokemon.name}</p>
                            {detalles && <p>Altura: {detalles.height}</p>}
                            {detalles && <p>Peso: {detalles.weight}</p>}

                        </Link>
                    </div>
                )
            })}
            </div>
        </div>
        <button onClick={peticion}>Cargar más</button>

    
    </>
  )
}

export default Pokemon
