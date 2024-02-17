import { useEffect } from "react";
import { useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs, doc, setDoc, addDoc } from "firebase/firestore";
import '../assets/css/JuegoAdivinar.css';


function JuegoAdivinar() {
    const [pokemonCorrecto, setPokemonCorrecto] = useState({});
    const [respuesta, setRespuesta] = useState("");
    const [puntuacion, setPuntuacion] = useState("");
    const [puntuacionPartida, setPuntuacionPartida] = useState("");
    const [preloader, setPreloader] = useState(false);
    const [opcionesShuffle, setOpcionesShuffle] = useState([]);
    const botones = document.querySelectorAll('.botones');

    const auth = getAuth();


    function generarNumeroAleatorio() {
       return Math.floor(Math.random() * 1025) + 1;
    }


    function peticionDetalles() {
        setPreloader(true);
        const numeroAleatorio = generarNumeroAleatorio();
        return fetch(`https://pokeapi.co/api/v2/pokemon/${numeroAleatorio}/`)
            .then((response) => response.json())
            .then((data) => {
                setPreloader(false);
                return data;
            });
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function Jugar() {
        const pokemon = document.getElementById('pokemon-adivinar');
        pokemon.style.filter = "brightness(0%)";
        setPuntuacionPartida(0);
        
        const pokemons = [];
        for (let i = 0; i < 3; i++) {
            pokemons.push(peticionDetalles());
        }
        Promise.all(pokemons).then((result) => {
            let nombres = [];
            result.forEach((pokemon) => {
                nombres.push(pokemon.name);
            });
            setPokemonCorrecto(result[Math.floor(Math.random() * 3)]);
            setOpcionesShuffle(shuffleArray(nombres));
            console.log(opcionesShuffle);
        });

        botones.forEach((boton) => {
            boton.style.display = "";
        });

        
        setRespuesta("");
        setPuntuacionPartida(0);
    }

    function comprobarPokemon(nombre) {
        const pokemon = document.getElementById('pokemon-adivinar');

        if (nombre == pokemonCorrecto.name) {
            botones.forEach((boton) => {
                boton.style.display = "none";
            });
            pokemon.style.filter = "brightness(100%)";
            setRespuesta("¡Correcto!");
            setPuntuacion(puntuacion + 1);
            setTimeout(() => {
                Jugar();
            }, 2000);
        } else {
            botones.forEach((boton) => {
                boton.style.display = "none";
            });
            pokemon.style.filter = "brightness(100%)";
            cargarDatosFS(puntuacion, auth.currentUser.uid, auth.currentUser.displayName);
            setRespuesta("¡Incorrecto!");
            setPuntuacionPartida(puntuacion);
            setPuntuacion(0);

        }
    }




    function audio() {
        let audio = new Audio(`https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${pokemonCorrecto.id}.ogg`);
        audio.play();
    }


    async function cargarDatosFS(puntuacion, uid, userName) {
    const db = getFirestore();
    const leaderboard = collection(db, "leaderboard");

    //COMPROBAR SI EL USUARIO YA TIENE UNA PUNTUACION
    const q = query(leaderboard, where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
    let puntuacionBaseDatos = 0;
    let documentoId = null;

    querySnapshot.forEach((doc) => {
        puntuacionBaseDatos = doc.data().puntuacion;
        documentoId = doc.id;
    });
    if (puntuacion > puntuacionBaseDatos) {
        let datos = {
            puntuacion: puntuacion,
            uid: uid,
            userName: userName
        }

        if (documentoId) {
            const userDoc = doc(db, "leaderboard", documentoId);
            setDoc(userDoc, datos, { merge: true })
            .then(() => {
                console.log("Puntuación actualizada correctamente");
            })
            .catch((error) => {
                console.error("Error al actualizar ", error);
            });
        } else {
            addDoc(leaderboard, datos)
            .then((docRef) => {
                console.log("Primera puntuacion:", docRef.id);
            })
            .catch((error) => {
                console.error("Error al añadir la primera puntuacion: ", error);
            });
        }
    }
}

    useEffect(() => {
        setPuntuacion(0);
        Jugar();
    }, []);

    return (
        <>
        <main className="container">
            <div className="juego">
                <div className="container-enunciado">
                    <h1>Juego Adivinar</h1>
                    <p>¡Elige una de las 3 opciones e intenta adivinar el Pokémon!</p>
                </div>
                <article id='preload'>
                    {preloader && <div className="o-pokeball c-loader u-tada"></div>}
                </article>
                <div className="container-juego">
                    {pokemonCorrecto && <img id="pokemon-adivinar" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonCorrecto.id}.png`} alt="" />}
                    <h3>Puntuación: {puntuacion}</h3>
                    {puntuacionPartida && <h3>Puntuación Partida: {puntuacionPartida}</h3>}
                    {respuesta == "¡Correcto!" && 
                        <div> 
                            <h3 className="correcto" id="respuesta">{respuesta}</h3>
                            <h2>Nombre Pokemon: <span className="name">{pokemonCorrecto.name}</span></h2>
                        </div>
                    }
                    {respuesta == "¡Incorrecto!" &&  
                    <div>
                        <h3 className="incorrecto" id="respuesta">{respuesta}</h3>
                        <h2>Nombre Pokemon: <span className="name">{pokemonCorrecto.name}</span></h2>
                        <div className="botones-opciones" id="botonjugar">
                            <div className="foto-perder" >
                                <img src="./img/pikachullorando.png" alt="" />
                            </div>
                            <button className="botones" onClick={Jugar}>Nueva Partida</button>
                        </div>
                    </div>
                    }
                    <p className="botones-opciones">Si te sirve como ayuda, te dejo una pequeña pista...
                        <button id="playButton" onClick={audio}>
                            <p>Reproducir</p>
                        </button>
                    </p>

                </div>

                <div className="botones-opciones">
                    {opcionesShuffle.map((opcion, index) => (
                        <button key={index} className="botones" onClick={() => comprobarPokemon(opcion)}>
                            <p className="name">{opcion}</p>
                        </button>
                    ))}
                </div>

            </div>
        </main>


        </>
    );

}




export default JuegoAdivinar;