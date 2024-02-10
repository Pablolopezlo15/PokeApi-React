import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './Pokemon.css'
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
    const [hover, setHover] = useState(false);


    function peticion() {
        fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=9`)
            .then((response) => response.json())
            .then((data) => {
                setPokemons(prevPokemons => [...prevPokemons, ...data.results]);
                setOffset(prevOffset => prevOffset + 9);
    
                // Hacer una petición de los detalles de cada Pokémon
                data.results.forEach(pokemon => {
                    peticionDetalles(pokemon.name);
                });
            });
    }

    function peticionDetalles(pokemon) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`)
            .then((response) => response.json())
            .then((data) => {
                setDetallePokemon(prevDetalle => ({...prevDetalle, [pokemon]: data}));
                console.log(data);
            });
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

      let styleCard = (color) => {
        card.style.background = `radial-gradient(circle at 50% 0%, ${color} 36%, #ffffff 36%)`;
      };

    return (
        <>
            <div class="input-group">
                <input id="input-field" type="text" value={valueInputBuscar} onChange={(e) => setValueInputBuscar(e.target.value)} placeholder='Buscar...' />
	        	<button onClick={buscar} class="submit-button"><span>SEARCH</span></button>
	        </div>


            <div className='container'>
                <div  class="container-pokemons">
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
                            
                            <p class="hp">
                              <span>HP </span>
                                {detalles && detalles.stats[0].base_stat}
                            </p>
                            <p class="poke-id"># {detalles && detalles.id}</p>
                            <img src={detalles && `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${detalles.id}.png`} />
                            <h2 class="poke-name name">{pokemon.name}</h2>
                            <div class="types">
                                <div class="type" style={{background: color}}><span>{detalles && detalles.types[0].type.name}</span></div>
                                {detalles && detalles.types.length > 1 && 
                                    <div class="type" style={{background: typeColor[detalles.types[1].type.name]}}>
                                        <span>{detalles.types[1].type.name}</span>
                                    </div>
                                }
                            </div>
                            <div class="stats">
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
            <div class="container">
            <button class="button" onClick={peticion}>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" class="pokeball"><path stroke="#000" fill="#fe0505" d="m26.425 16.455a10.925 10.925 0 0 1 -10.925 10.925 10.925 10.925 0 0 1 -10.925-10.925 10.925 10.925 0 0 1 10.925-10.925 10.925 10.925 0 0 1 10.925 10.925z"></path><path stroke="#000" fill-rule="evenodd" fill="#fff" d="m26.245 17.168c-1.024.744-1.984 1.248-3.282 1.757-4.738 1.84-10.565 1.816-15.271-.06-1.13-.455-2.12-.99-3.042-1.626.387 5.753 5.119 10.207 10.885 10.207 6.491-.256 10.32-5.361 10.71-10.278z"></path><path transform="translate(0 -1020.362)" fill-rule="evenodd" d="m26.196 1036.339-.508.406c-.94.682-1.83 1.116-3.088 1.61-4.476 1.737-10.09 1.715-14.535-.055h-.004a15.14 15.14 0 0 1 -2.568-1.32c-.02-.014-.166-.133-.354-.263l-.842 1.431c.04.028-.105.372.11.51.89.577 1.867 1.078 2.912 1.499h.002c4.968 1.98 11.005 2.003 16.004.062h.004c1.337-.525 2.43-1.053 3.537-1.856l-.038-.18-.128-.85-.504-.993z"></path><path stroke="#000" fill="#fff" d="m17.976 19.69a2.4 2.4 0 0 1 -2.4 2.4 2.4 2.4 0 0 1 -2.4-2.4 2.4 2.4 0 0 1 2.4-2.4 2.4 2.4 0 0 1 2.4 2.4z"></path></svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="250" viewBox="0 0 451.103 424.198" height="100" class="pika"><path stroke-width="2.808" stroke-linejoin="round" stroke-linecap="round" stroke="#000" fill="#fff22d" d="m160.524 320.079-46.872-17.64 15.048-20.088s-51.912-16.704-64.439-21.744l42.695-87.12-90.432-8.352-15.12-77.112 180.936 43.56-61.991 108.936 48.6 21.744-26.856 33.48 30.169 20.16z"></path><path fill="#e8d031" d="m114.588 302.223 15.048-20.16-.792-.216-.072-.072-.216-.072-.216-.072-.36-.072-.36-.144-.504-.144-.504-.144-.576-.216-.576-.216-.72-.216-.72-.216-.792-.288-.864-.288-.864-.288-.936-.288-1.008-.288-1.007-.36-1.009-.36-1.152-.36-1.08-.36-1.152-.36-1.224-.36-1.224-.432-1.224-.36-1.224-.432-1.295-.432-1.297-.432-1.367-.432-1.369-.504-2.376-.792-.288-.72 16.056 3.888-6.768-12.672 17.064 2.376-3.816-12.312 16.848 5.328-3.312-10.008 30.672 13.752-26.711 33.408 29.735 19.8-10.512 3.744z"></path><path stroke-width="2.808" stroke-linejoin="round" stroke-linecap="round" stroke="#000" fill="#e8d031" d="m191.484 383.583s-21.672 21.96-25.632 34.561c-3.96 12.672 37.944-2.16 64.584-25.128 26.712-23.113-38.952-9.433-38.952-9.433zm144.288 0s21.672 21.96 25.631 34.561c3.961 12.672-37.872-2.16-64.583-25.128-26.712-23.113 38.952-9.433 38.952-9.433z"></path><path stroke-width="2.808" stroke-linejoin="round" stroke-linecap="round" stroke="#000" fill="#fff22d" d="m179.316 198.399c-12.6-13.176-20.88-36.144-18.072-50.832 3.096-15.912 9.288-31.608 10.368-40.248 1.008-8.64 6.984-26.928 7.272-26.784-16.776-5.4-37.513-15.264-51.48-28.512-13.968-13.176-46.008-42.408-42.696-48.888 3.456-6.696 47.16 7.704 69.048 14.76 21.961 7.056 47.664 28.512 47.448 28.944.145.36 35.424-16.992 68.256-16.272 32.761.648 52.776 9 63.576 15.912-.216-.072 25.489-21.528 47.375-28.584 21.889-7.056 65.592-21.456 69.049-14.76 3.312 6.48-28.729 35.712-42.695 48.888-13.969 13.248-32.113 23.112-48.889 28.512.287-.144 6.119 11.088 7.92 22.32 1.729 11.232 5.039 27.72 9.072 43.416 3.24 12.744-2.305 38.952-16.057 53.136-1.799 2.52 29.305 72 24.984 110.448-4.393 38.448-13.32 66.024-37.225 78.12-23.616 11.952-123.624 5.04-148.607-1.512-22.681-5.976-41.041-32.904-49.681-73.512s31.61-112.968 31.034-114.552z"></path><path d="m329.58 95.655c9.937 0 18 7.2 18 16.056s-8.063 16.056-18 16.056c-9.863 0-18-7.2-18-16.056s8.137-16.056 18-16.056zm-120.24 1.152c9.864 0 18 7.2 18 16.056 0 8.784-8.136 15.984-18 15.984-9.936 0-18-7.2-18-15.984 0-8.856 8.064-16.056 18-16.056zm50.832 35.856 4.824 5.04c.576.576 1.225.576 1.872-.072l5.472-5.112c.36-.576.145-.864-.504-.792h-10.8c-1.08.072-1.224.432-.864.936z"></path><g stroke="#000"><path stroke-width="2.808" stroke-linejoin="round" stroke-linecap="round" fill="#905744" d="m247.644 161.319c13.824-2.664 18.72-7.488 18.72-7.488s3.672 4.536 15.696 7.344c-15.192 54.432-34.416 1.44-34.416.144z"></path><path stroke-width=".216" d="m408.995 50.007c14.832-13.968 43.633-40.68 40.465-46.872-1.943-3.888-17.352-.72-34.271 4.032-.504 2.664 3.168 12.528-1.369 26.712-1.584 5.04-3.313 10.656-4.825 16.128zm-284.183-41.184c-19.008-5.544-37.872-10.008-40.104-5.688-3.312 6.48 28.729 35.712 42.696 48.888 2.304 2.16 4.824 4.32 7.632 6.48-1.8-8.784-5.184-20.232-8.208-29.664-2.664-8.424-2.52-15.264-2.016-20.016z"></path><path stroke-width="2.808" stroke-linejoin="round" stroke-linecap="round" fill="#cc2229" d="m347.075 146.271c8.785 0 15.984 7.488 15.984 16.632s-7.199 16.632-15.984 16.632c-8.784 0-15.984-7.488-15.984-16.632.001-9.144 7.201-16.632 15.984-16.632zm-158.471-5.04c8.784 0 15.983 7.488 15.983 16.632s-7.199 16.56-15.983 16.56-15.984-7.416-15.984-16.56 7.2-16.632 15.984-16.632zm91.368 26.712c-11.305 32.76-24.192 12.384-29.592.36 3.888-3.816 9.144-6.192 14.976-6.192 5.544 0 10.728 2.232 14.616 5.832z"></path><path stroke-width="2.808" stroke-linejoin="round" stroke-linecap="round" fill="none" d="m266.364 153.615c7.056 6.264 25.776 13.536 32.112.792m-32.112-.792c-7.2 5.76-25.848 13.536-32.184.792"></path></g><path fill="#fff" d="m267.084 132.591c1.656 0 2.952.432 2.952.937 0 .576-1.296 1.008-2.952 1.008-1.584 0-2.88-.432-2.88-1.008 0-.505 1.296-.937 2.88-.937z"></path><path stroke-width="3.168" stroke-linejoin="round" stroke-linecap="round" stroke="#000" fill="none" d="m227.052 231.015s7.632 5.112 14.832 32.112c4.392 16.632 11.304 20.376 13.248 24.696 1.943 4.392 4.319 10.584-1.368 7.2-5.688-3.384-7.416-3.024-5.185 1.584 2.305 4.608 1.08 7.488-7.056 1.512-6.048-4.392-5.976.504-4.248 3.024s1.656 9.504-5.472 3.312c-7.057-6.12-9.217-3.6-7.128.792 2.088 4.32 3.743 9.792-7.057 2.232-3.239-2.232-8.063-11.952-12.815-17.208-11.232-12.456-24.265-24.48-28.801-42.336"></path><path stroke-width="3.456" stroke-linejoin="round" stroke-linecap="round" stroke="#000" fill="none" d="m308.34 242.679s-6.407 5.976-7.703 31.176c-.864 15.552-6.84 20.16-7.849 24.336-1.008 4.248-2.016 10.152 2.88 6.12 4.824-4.032 6.553-4.104 5.328.432-1.224 4.464.576 6.768 7.272-.072 4.968-4.968 5.903-.648 4.752 1.872-1.152 2.592.432 8.712 6.048 1.944s8.28-4.968 7.128-.72-1.584 9.36 7.416.72c2.664-2.592 5.4-12.096 8.928-17.64 8.352-13.176 18.576-26.208 19.225-42.912"></path><path stroke-width=".936" stroke="#000" fill="none" d="m166.068 421.383 12.096-13.32m183.025 13.32-12.098-13.32m-179.279 14.256 15.84-10.728m171.865 10.728-15.84-10.728"></path><path fill="#e8d031" d="m405.181 52.815c-13.752 12.528-31.248 21.888-47.449 27.072h-.072c-4.104-7.848-8.424-18.144-11.736-19.224 26.064 3.528 45.864-1.656 59.257-7.848zm-269.569 5.4c14.976 10.512 29.016 17.28 43.776 21.672 4.176-7.848 8.063-14.976 11.376-19.008-26.064 3.528-41.76 3.528-55.152-2.664zm106.273 160.776c1.943 2.304 33.983 9.36 52.344-.144-27.505 38.16-53.713.432-52.344.144z"></path><path fill="#fff" d="m335.7 99.471c2.88 0 5.184 2.304 5.184 5.04 0 2.808-2.304 5.04-5.184 5.04-2.808 0-5.112-2.232-5.112-5.04 0-2.736 2.304-5.04 5.112-5.04zm-120.24 1.152c2.809 0 5.112 2.232 5.112 5.04s-2.304 5.04-5.112 5.04c-2.88 0-5.184-2.232-5.184-5.04s2.304-5.04 5.184-5.04z"></path><path fill="#e8d031" d="m175.788 249.303c-1.439 8.424-2.304 15.336 10.513 35.784 12.743 20.448 28.728 21.384 28.728 21.384s-6.768-10.368-9.504-14.04-9.792-10.224-14.472-15.984c-2.953-3.168-11.593-13.968-15.265-27.144zm183.241 128.952c-3.6 3.528-7.705 6.552-12.457 8.928-23.616 11.952-123.624 4.968-148.607-1.584-12.528-3.24-23.688-12.96-32.688-27.792 13.104 8.064 32.184 18.576 42.768 19.656 17.353 1.656 38.017-5.112 52.776-4.68 14.76.432 34.561 8.856 56.88 8.856 14.327 0 28.294-.504 41.328-3.384zm1.439-118.152s-2.305 5.544-4.32 9.864c-1.943 4.32-6.48 11.304-8.279 13.68-1.801 2.304-4.824 6.984-5.904 9.144-2.016 4.104-3.528 8.784-5.904 12.6 0 0 4.104-3.744 6.48-6.984 2.305-3.24 8.568-9.936 12.168-15.84 3.599-5.904 5.759-22.464 5.759-22.464z"></path></svg>
              <span class="go">More</span>
              <span class="pword">pika</span>
              <span class="pword2">pika</span>
            </button>
            </div>
        </>
    )
}

export default Pokemon
