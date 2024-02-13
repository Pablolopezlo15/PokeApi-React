import { useEffect } from "react";
import { useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs, doc, setDoc, addDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import './assets/css/JuegoAdivinar.css';


function JuegoAdivinar() {
    const [detallePokemon, setDetallePokemon] = useState({});
    const [nombreAleatorio1, setNombreAleatorio1] = useState("");
    const [nombreAleatorio2, setNombreAleatorio2] = useState("");
    const [respuesta, setRespuesta] = useState("");
    const [puntuacion, setPuntuacion] = useState("");
    const [preloader, setPreloader] = useState(false);

    const [user, setUser] = useState(null);
    const auth = getAuth();
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setUser(user);
    });
    }, []);
    if (auth.currentUser) {
        let uid = auth.currentUser.uid;
        let userName = auth.currentUser.displayName;
        console.log('Usuario logueado: ' + userName + ' con uid: ' + uid);
    }



    function generarNumeroAleatorio() {
       return Math.floor(Math.random() * 1025) + 1;
    }


    function peticionDetalles(setNombre) {
        setPreloader(true);
        const numeroAleatorio = generarNumeroAleatorio();
        fetch(`https://pokeapi.co/api/v2/pokemon/${numeroAleatorio}/`)
            .then((response) => response.json())
            .then((data) => {
                setPreloader(false);
                setNombre(data);
                console.log(data)
            });
    }

    function Jugar(){
        const pokemonAdivinado = document.getElementById('pokemon-adivinar')
        pokemonAdivinado.style.filter = 'brightness(0)';
        setRespuesta('');
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
        const pokemonAdivinado = document.getElementById('pokemon-adivinar')

        if (name === detallePokemon.name) {
            pokemonAdivinado.style.filter = 'brightness(1)';

            setRespuesta('¡Correcto!');
            setPuntuacion(puntuacion+1);
            console.log(puntuacion)
            console.log(respuesta);
            setTimeout(() => {
                pokemonAdivinado.style.filter = 'brightness(0)';
                setRespuesta('');
                Jugar();
                
            }, 2000);
        } else {
            pokemonAdivinado.style.filter = 'brightness(1)';
            cargarDatosFS(puntuacion, auth.currentUser.uid, auth.currentUser.displayName);
            setPuntuacion(0);
            setRespuesta('¡Incorrecto!');
            console.log(respuesta);
        }

    }

    function audio() {
        let audio = new Audio(`https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${detallePokemon.id}.ogg`);
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
                console.log("Document successfully updated!");
            })
            .catch((error) => {
                console.error("Error updating document: ", error);
            });
        } else {
            addDoc(leaderboard, datos)
            .then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
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
            <div className="">
                <div className="container-enunciado">
                    <h1>Juego Adivinar</h1>
                    <p>¡Elige una de las 3 opciones e intenta adivinar el Pokémon!</p>
                </div>
                <article id='preload'>
                    {preloader && <div className="o-pokeball c-loader u-tada"></div>}
                </article>
                <div className="container-juego">
                    {detallePokemon && <img id="pokemon-adivinar" src={detallePokemon && `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${detallePokemon.id}.png`} alt="" />}
                    <h3 id="respuesta">{respuesta}</h3>
                    <h3>Puntuación: {puntuacion}</h3>
                    {respuesta == '¡Incorrecto!'  && <div className="botones-opciones" id="botonjugar">
                        <button className="botones" onClick={Jugar}>Nueva Partida</button>
                    </div>}
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