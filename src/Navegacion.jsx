import {
    Link
} from "react-router-dom";

function Navegacion() {
    return (
        <>
            <Link to="/">Home</Link>
            <Link to="/pokemon">Pokemons</Link>
            <Link to="/login">Login</Link>
        </>
    );
}

export default Navegacion;
