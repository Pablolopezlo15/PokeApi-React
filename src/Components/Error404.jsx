import { Link } from "react-router-dom";
import Navegacion from "./Navegacion";
function Error404(){
    return(
        <div className="container">
            <div div className="error404">
                <h1>¡No hemos encontrado la página!</h1>
                <img src="./public/img/error404.png" alt="" />
                <h3>¿Qué quieres hacer?</h3>
                <Navegacion />
            </div>
        </div>
    )
}

export default Error404;