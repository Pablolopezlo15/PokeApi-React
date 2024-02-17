import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Await } from 'react-router-dom'
import '../assets/css/App.css'
import '../assets/css/Pokemon.css'

import {
    Link
} from "react-router-dom";



function Pokemon() {
    const [offset, setOffset] = useState(0);
    const [pokemons, setPokemons] = useState([]);
    const [detallePokemon, setDetallePokemon] = useState({});
    const [valueInputBuscar, setValueInputBuscar] = useState('');
    const [hover, setHover] = useState(false);
    const [preloader, setPreloader] = useState(false);
    const navigate = useNavigate();

    function peticion() {
        setPreloader(true);
        fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=9`)
            .then((response) => response.json())
            .then((data) => {
                setPreloader(false);
                setPokemons(prevPokemons => [...prevPokemons, ...data.results]);
                setOffset(prevOffset => prevOffset + 9);
    
                // Hacer una petición de los detalles de cada Pokémon
                data.results.forEach(pokemon => {
                    peticionDetalles(pokemon.name);
                });
            });
    }

    function peticionDetalles(pokemon) {
        setPreloader(true);
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`)
            .then((response) => response.json())
            .then((data) => {
                setPreloader(false);
                setDetallePokemon(prevDetalle => ({...prevDetalle, [pokemon]: data}));
                console.log(data);
            });
    }

    const typeColor = {
        bug: "#26de81",
        dragon: "#ffeaa7",
        electric: "#fed330",
        fairy: "#FF0069",
        fighting: "#30336b",
        fire: "#f0932b",
        flying: "#81ecec",
        grass: "#00b894",
        ground: "#EFB549",
        ghost: "#a55eea",
        ice: "#74b9ff",
        normal: "#95afc0",
        poison: "#6c5ce7",
        psychic: "#a29bfe",
        rock: "#2d3436",
        water: "#0190FF",
      };

    function buscar(e) {
        navigate(`/pokemon/${valueInputBuscar}`);
    }

    const enterKey = (event) => {
        if (event.key === 'Enter') {
            buscar(valueInputBuscar);
        }
    };

    useEffect(() => {
        peticion();
    }, []);

    return (
        <>
            <div className="input-group">
                <input id="input-field" type="text" value={valueInputBuscar} onChange={(e) => setValueInputBuscar(e.target.value)} onKeyUp={enterKey} placeholder='Buscar...' />
	        	<button onClick={buscar} className="submit-button"><span>SEARCH</span></button>
	        </div>


            <div className='container'>
                <div  className="container-pokemons">
                {pokemons.map((pokemon, index) => {
                    const detalles = detallePokemon[pokemon.name];
                    const tipo = detalles && detalles.types[0].type.name;
                    const color = typeColor[tipo];

                    return (
                        <Link to={`/pokemon/${index + 1}`} >
                        <div key={index} className="card" style={{ 
                            background: detalles ? `radial-gradient(circle at 50% 0%, ${color} 36%, #ffffff 36%)` : ''
                        }}
                        onMouseEnter={() => setHover(true)}
                        onMouseLeave={() => setHover(false)}>
                            
                            <p className="hp">
                              <span>HP </span>
                                {detalles && detalles.stats[0].base_stat}
                            </p>
                            <p className="poke-id"># {detalles && detalles.id}</p>
                            <img src={detalles && `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${detalles.id}.png`} />
                            <h2 className="poke-name name">{pokemon.name}</h2>
                            <div className="types">
                                <div className="type" style={{background: color}}><span>{detalles && detalles.types[0].type.name}</span></div>
                                {detalles && detalles.types.length > 1 && 
                                    <div className="type" style={{background: typeColor[detalles.types[1].type.name]}}>
                                        <span>{detalles.types[1].type.name}</span>
                                    </div>
                                }
                            </div>
                            <div className="stats">
                              <div>
                                <h3>{detalles && detalles.stats[1].base_stat}</h3>
                                <p>Attack</p>
                              </div>
                              <div>
                                <h3>{detalles && detalles.stats[2].base_stat}</h3>
                                <p>Defense</p>
                              </div>
                              <div>
                                <h3>{detalles && detalles.stats[5].base_stat}</h3>
                                <p>Speed</p>
                              </div>
                            </div>
                        </div>
                        </Link>
                    )
                })}
                </div>
            </div>
            <article id='preload'>
                    {preloader && <div className="o-pokeball c-loader u-tada"></div>}
            </article>
            <br />
            <div className="container-final">
                <button className="button" onClick={peticion}>
                    <img src="../img/pokeball.svg" className='pokeball' alt="" />
                    <img src="../img/pikapika.svg" className='pika' alt="" />
                  <span className="go">More</span>
                  <span className="pword"><i className="ri-arrow-down-s-line"></i></span>
                </button>
            </div>
        </>
    )
}

export default Pokemon
