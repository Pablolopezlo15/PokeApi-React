
import React from 'react';
import { useEffect, useState } from 'react';
import './assets/css/cabecera.css';
import Navegacion from './Navegacion';
import { getAuth, signOut, onAuthStateChanged  } from 'firebase/auth';

function Cabecera() {
    const [user, setUser] = useState(null);
    const auth = getAuth();
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setUser(user);
    });
    }, []);

    let userName = null;
    console.log(auth.currentUser);

    if (auth.currentUser) {
        let uid = auth.currentUser.uid;
        let userName = auth.currentUser.displayName;
        console.log('Usuario logueado: ' + userName + ' con uid: ' + uid);
    }

    function logout() { 
        const auth = getAuth();
        signOut(auth).then(() => {
            console.log('Sesión cerrada');
        }).catch((error) => {
          // An error happened.
        });
    }



    return (
        <>
            <header>    
                <div className='menu-arriba'>
                    <div className='img-logo'>
                        <img src="https://imgs.search.brave.com/zQMYyofQY4Vhe6e7CFikPhx1B1CRmQ1mVHYu1se6TgA/rs:fit:860:0:0/g:ce/aHR0cHM6Ly8xMDAw/bWFyY2FzLm5ldC93/cC1jb250ZW50L3Vw/bG9hZHMvMjAyMC8w/MS9Mb2dvLVBva2Vt/b24tNTAweDMxMy5w/bmc" alt="Logo Pokemon" />
                    </div>
                    <div className='menu-derecha'>

                        <label className='label-menu' htmlFor="checkboxMenu">
                            <div className='img-menu'>
                                <img src="../img/5.svg" className="header-icon header-icon-menu fa-solid fa-bars" alt="" />
                                <p>Menú</p>
                            </div>
                        </label>

                        <input style={{display: 'none'}} type="checkbox" id="checkboxMenu"/>

                        <nav className="header-nav">
                            <Navegacion />
                        </nav>

                        {user && (
                            <div className='cerrarsesion'>
                                <p>{user.displayName}</p>
                                <button className="Btn" onClick={logout}>
                                    <div className="sign"><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg></div>
                                    <div className="text">Logout</div>
                                </button>
                            </div>
                        )}


                    </div>


                </div>


            </header>

        </>
    );
}

export default Cabecera;