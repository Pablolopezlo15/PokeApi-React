
import React from 'react';
import './cabecera.css';
import Navegacion from './Navegacion';

function Cabecera() {



    return (
        <>
    <header>        
        <div>
            <label htmlFor="checkboxMenu">
                <div className='img-menu'>
                    <img src="./img/5.svg" className="header-icon header-icon-menu fa-solid fa-bars" alt="" />
                </div>
            </label>
            <input style={{display: 'none'}} type="checkbox" id="checkboxMenu"/>

            <nav className="header-nav">
                <Navegacion />
            </nav>
        </div>
        </header>

        </>
    );
}

export default Cabecera;