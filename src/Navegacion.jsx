import {
    Link
} from "react-router-dom";

function Navegacion() {
    return (
        <>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/pokemon">Pokemons</Link></li>
            <li><Link to="/login">Login</Link></li>
        </ul>
        </>
    );
}

export default Navegacion;
