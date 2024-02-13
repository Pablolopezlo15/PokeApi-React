import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './assets/css/App.css';
import './assets/css/Detalle.css';

function Detalle() {
    const { id } = useParams();
    const [detallePokemon, setDetallePokemon] = useState({});
    const [preloader, setPreloader] = useState(false);

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

    useEffect(() => {
        peticionDetalles();
    }, []);
    
  return (
    <>
        <div className='detalle'>
                    <article id='preload'>
                        {preloader && <div className="o-pokeball c-loader u-tada"></div>}
                    </article>
            {detallePokemon.data && (
                <>
                <div className='card-Pokemon'>
                    <div className='info'>
                        <h1 className='name'>{detallePokemon.data.name}</h1>
                        <h2>Pokedex Nº {id}</h2>
                        <h3>Datos</h3>
                        <p>Altura: {detallePokemon.data.height}</p>
                        <p>Peso: {detallePokemon.data.weight}</p>
                        <p>Experiencia Base: {detallePokemon.data.base_experience}</p>
                        <h3>Habilidades</h3>
                        <ul>
                            {detallePokemon.data.abilities.map((habilidad, index) => (
                                <li key={index}>{habilidad.ability.name}</li>
                            ))}
                        </ul>
                        <h3>Tipos</h3>
                        <ul>
                            {detallePokemon.data.types.map((tipo, index) => (
                                <li key={index}>{tipo.type.name}</li>
                            ))}
                        </ul>


                    </div>
                    <div className='imagenes'>
                        <div className='imagen-principal'>
                            <img src={detallePokemon.data.sprites.other.showdown.front_default} alt="showdown_front_default" />
                        </div>
                        <div className='imagen-secundaria'>
                            <img src={detallePokemon.data.sprites.front_default} alt="front_default" />
                            <img src={detallePokemon.data.sprites.front_shiny} alt="front_shiny" />
                        </div>
                    </div>

                </div>

                </>
            )}
        </div>
    </>

  )
}

export default Detalle;