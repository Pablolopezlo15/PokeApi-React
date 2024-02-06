import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Cabecera from './cabecera'

function App() {
    const [offset, setOffset] = useState(0);
    const [pokemons, setPokemons] = useState([]);

    function peticion() {
        fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`)
        .then((response) => response.json())
        .then((data) => setPokemons(prevPokemons => [...prevPokemons, ...data.results]),
                        setOffset(prevOffset => prevOffset + 20)
        )
        console.log(pokemons);
    }

    function peticionDetalles(name) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`)
        .then((response) => response.json())
        .then((data) => console.log(data))

    }


    return (
    <>
    <Cabecera />
        <input type="text"  placeholder='Buscar...'></input>
        <button onClick={peticion}>Cargar Pokemons</button>
        <div>
            {pokemons.map((pokemon) => (
                <>
                    <p key={pokemon.name}>{pokemon.name}</p>
                    <button onClick={peticionDetalles(pokemon.name)}>Detalles</button>
                    {/* <img src={pokemon.sprites.front_default} alt="" /> */}

                </>
                
            ))}
        </div>
        <button onClick={peticion}>Cargar más</button>

    
    </>
  )
}

export default App
