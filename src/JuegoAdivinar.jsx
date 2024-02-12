import { useEffect } from "react";
import { useState } from "react";
import './assets/css/JuegoAdivinar.css';


function JuegoAdivinar() {
    const [detallePokemon, setDetallePokemon] = useState({});
    const [nombreAleatorio1, setNombreAleatorio1] = useState("");
    const [nombreAleatorio2, setNombreAleatorio2] = useState("");
    const [respuesta, setRespuesta] = useState("");
    const [puntuacion, setPuntuacion] = useState("");
 
    function generarNumeroAleatorio() {
       return Math.floor(Math.random() * 1025) + 1;
    }


    function peticionDetalles(setNombre) {
        const numeroAleatorio = generarNumeroAleatorio();
        fetch(`https://pokeapi.co/api/v2/pokemon/${numeroAleatorio}/`)
            .then((response) => response.json())
            .then((data) => {
                setNombre(data);
                console.log(data)
            });
    }

    function Jugar(){
        peticionDetalles(setDetallePokemon);
        peticionDetalles(setNombreAleatorio1);
        peticionDetalles(setNombreAleatorio2);
        const botones = document.getElementsByClassName('botones');
        for (let i = 0; i < botones.length; i++) {
            botones[i].style.display = '';
        }

    }

    function comprobarPokemon(name) {
        const botones = document.getElementsByClassName('botones');
        for (let i = 0; i < botones.length; i++) {
            botones[i].style.display = 'none';
        }
        
        if (name === detallePokemon.name) {
            const pokemonAdivinado = document.getElementById('pokemon-adivinar')
            pokemonAdivinado.style.filter = 'brightness(1)';

            setRespuesta('¡Correcto!');
            setPuntuacion(puntuacion+1);
            console.log(puntuacion)
            console.log(respuesta);
        } else {
            setPuntuacion(0);
            setRespuesta('¡Incorrecto!');
            console.log(respuesta);
        }
        setTimeout(() => {
            const pokemonAdivinado = document.getElementById('pokemon-adivinar')
            pokemonAdivinado.style.filter = 'brightness(0)';
            setRespuesta('');
            Jugar();
            
        }, 2000);
    }

    function audio() {
        let audio = new Audio(`https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${detallePokemon.id}.ogg`);
        audio.play();
    }


    useEffect(() => {
        setPuntuacion(0);
        Jugar();
    }, []);

    return (
        <>
        <main className="container">
            <div >
                <div className="container-enunciado">
                    <h1>Juego Adivinar</h1>
                    <p>¡Elige una de las 3 opciones e intenta adivinar el Pokémon!</p>
                </div>

                <div className="container-juego">
                    {detallePokemon && <img id="pokemon-adivinar" src={detallePokemon && `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${detallePokemon.id}.png`} alt="" />}
                    <h3 id="respuesta">{respuesta}</h3>
                    <h3>Puntuación: {puntuacion}</h3>

                    <p className="botones-opciones">Si te sirve como ayuda, te dejo una pequeña pista...
                        <button id="playButton" onClick={audio}>
                            <p>Reproducir</p>
                        </button>
                    </p>

                </div>

                <div className="botones-opciones">
                    <button className="botones" onClick={() => comprobarPokemon(nombreAleatorio1.name)}>{nombreAleatorio1 &&<p className="name">{nombreAleatorio1.name}</p>}</button>
                    <button className="botones" onClick={() => comprobarPokemon(detallePokemon.name)}>{detallePokemon &&<p className="name">{detallePokemon.name}</p>}</button>
                    <button className="botones" onClick={() => comprobarPokemon(nombreAleatorio2.name)}>{nombreAleatorio2 &&<p className="name">{nombreAleatorio2.name}</p>}</button>
                </div>
            </div>
        </main>


        </>
    );

}



export default JuegoAdivinar;