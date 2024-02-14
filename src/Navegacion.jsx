import {
    Link
} from "react-router-dom";

function Navegacion() {
    return (
        <>
        <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/pokemon">Pokedex</Link></li>
            <li><Link to="/juegoAdivinar">Mini Juego</Link></li>
            <li><Link to="/leaderboard">Leaderboard</Link></li>
        </ul>
        </>
    );
}

export default Navegacion;
