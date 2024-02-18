import React from 'react';
import { useEffect, useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../assets/css/App.css';
import '../assets/css/Detalle.css';
import Chart from 'chart.js/auto';

function Detalle() {
    const { id } = useParams();
    const [detallePokemon, setDetallePokemon] = useState({});
    const [preloader, setPreloader] = useState(false);
    const [imagenSeleccionada, setImagenSeleccionada] = useState('');
    const [noEncontrado, setNoEncontrado] = useState(false);
    const navigate = useNavigate();
    const chartContainer = useRef(null);
    const chartRef = useRef(null);

    function peticionDetalles() {
        setPreloader(true);
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        .then((response) => response.json())
        .then((data) => {
            setPreloader(false);
            setDetallePokemon(prevDetalle => ({...prevDetalle, data}));
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


      function chart(abilities) {
        if (chartRef.current) {
            chartRef.current.destroy();
        }
    
        const selectedAbilities = abilities.map(ability => {
            return {
                name: ability.ability.name,
                height: ability.slot,
            }
        });
    
        const data = {
            labels: detallePokemon.data ? detallePokemon.data.stats.map((stat) => stat.stat.name) : [],
            datasets: [
                {
                    label: 'Estadísticas',
                    data: detallePokemon.data ? detallePokemon.data.stats.map((stat) => stat.base_stat) : [],
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                },
            ],
        };
    
        const options = {
            scales: {
                r: {
                    suggestedMin: 0,
                    suggestedMax: 5,
                },
            },
        };
    
        const ctx = chartContainer.current.getContext('2d');
        chartRef.current = new Chart(ctx, { type: 'radar', data, options });
    }

    

    useEffect(() => {
        peticionDetalles();
    }, []);

    useEffect(() => {
        if (detallePokemon.data) {
            setImagenSeleccionada(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${detallePokemon.data.id}.png`);
            setNoEncontrado(false);
        }
        else {
            setPreloader(true);
            setTimeout(() => {
                setPreloader(false);
                setNoEncontrado(true);
            }, 1000);
        }
    }, [detallePokemon]);

    useEffect(() => {
        if (detallePokemon.data) {
            chart(detallePokemon.data.abilities);
        }
    }, [detallePokemon]);

  return (
    <div class='container'>    
        <div class='detalle'>
            <article id='preload'>
                {preloader && !noEncontrado && <div class="o-pokeball c-loader u-tada"></div>}
            </article>
            {noEncontrado && 
                <div className='container'>
                    <div class='error404'>
                        <h1>No se encontró el Pokémon</h1>
                        <Link to={"/pokemon"} className='volver'>Volver</Link>
                        <img src="../img/error404.png" alt="" />
                    </div>
                </div>
            }

            {detallePokemon.data && (               
                <>
                    <div class='tarjeta-pokemon'>
                        <div class='tarjeta-cabecera' style={{ 
                            background: detallePokemon.data ? typeColor[detallePokemon.data.types[0].type.name] : ''
                        }}>            
                            <div class='detalles'>
                                <h2 className='name-pokemon'>{detallePokemon.data.name}</h2>
                                <span className="pokedexid">#{id}</span>
                            </div>
                            <div className='tipo-container'>
                                {detallePokemon.data.types.map((typeObj, index) => (
                                    <span key={index} className='tipo' style={{backgroundColor: typeColor[typeObj.type.name]}}>{typeObj.type.name}</span>
                                ))}
                            </div>

                            <div class='imagen'>
                                    <img src={imagenSeleccionada} alt="showdown_front_default" />
                                </div>
                                <div class='menu-imagenes'>
                                        {Object.values(detallePokemon.data.sprites.other['official-artwork'])
                                            .filter(artwork => typeof artwork === 'string' && artwork)
                                            .map((image, index) => (
                                                <img key={index} src={image} alt="artwork" onClick={() => setImagenSeleccionada(image)} />
                                        ))}
                                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${detallePokemon.data.id}.gif`} alt="gif" onClick={() => setImagenSeleccionada(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${detallePokemon.data.id}.gif`)} />
                                </div>   
                            </div>

                        <div class='informacion'>
                            <div class='estadisticas'>
                                <div class='estatus'>
                                    <h3>Estatus</h3>
                                    <ul>
                                        <li>Altura: {detallePokemon.data.height}</li>
                                        <li>Peso: {detallePokemon.data.weight}</li>
                                        <li>Experiencia Base: {detallePokemon.data.base_experience}</li>
                                    </ul>
                                </div>
                                <div class='habilidades'>
                                    <h3>Habilidades</h3>
                                    <ul>
                                        {detallePokemon.data.abilities.map((habilidad, index) => (
                                            <li key={index}>{habilidad.ability.name}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div class='movimientos'>
                                    <h3>Movimientos</h3>
                                    <ul>
                                        {detallePokemon.data.moves.slice(0, 5).map((movimiento, index) => (
                                            <li key={index}>{movimiento.move.name}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div class='especies'>
                                    <h3>Especies</h3>
                                    <p>{detallePokemon.data.species.name}</p>
                                </div>

                            </div>

                        </div>
                        <div className='stats-grafico'>
                            <h3>Gráfico radial</h3>
                            <canvas ref={chartContainer} width='400' height='400'></canvas>
                        </div>
                    </div>

                </>
            )}
        </div>
    </div>


  )
}

export default Detalle;