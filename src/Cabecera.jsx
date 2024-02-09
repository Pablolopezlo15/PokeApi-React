
import React from 'react';
import './cabecera.css';
import Navegacion from './Navegacion';

function Cabecera() {



    return (
        <>
            <header className="cabecera">
                <nav className='navbar'>
                    <div className='img-nav'>
                        {/* <img src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png" alt="PokeApi logo" /> */}
                        {/* <img src="./img/Pokeball-PNG-Image.webp" alt="" /> */}
                    </div>
                    <ul>
                        <Navegacion></Navegacion>
                    </ul>
                </nav>
            </header>
        </>
    );
}

export default Cabecera;