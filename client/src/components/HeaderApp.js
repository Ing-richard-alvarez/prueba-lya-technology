import React from 'react';
import { Link } from "react-router-dom";

const HeaderApp = () => {
    return(
        <div>
            <nav className="navbar navbar-dark bg-dark">
                <a href="/" className="navbar-brand">Lya Electronic</a>
                <form className="form-inline">
                    <Link  className="btn btn-outline-primary my-2 mr-sm-0 mr-md-2 my-sm-0" type="button" to="/login">
                        Iniciar Sesion
                    </Link>
                    <Link className="btn btn-outline-success my-2 my-sm-0" type="button"to="/register">Crear Usuario</Link>
                </form>
            </nav>  
        </div>
    )
}

export default HeaderApp;