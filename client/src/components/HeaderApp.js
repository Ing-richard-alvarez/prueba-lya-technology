import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import jwt from 'jsonwebtoken';
import env from 'react-dotenv';
import Logout from './Logout';

const HeaderApp = () => {
    
    const [logged,setLogged] = useState({
        status: false
    });

    const token = localStorage.getItem('tokenSession');

    const verifyToken = async ( token ) => {
        try {
            return jwt.verify(token,env.JWT_SECRET);
        } catch (e) {
            return null;
        }
    }

    useEffect(()=>{
        verifyToken(token)
        .then(res => {
            //console.log(res)
            if(
                res !== null &&
                res._id !== null
            ) {
                setLogged({
                    status: true
                });
            } else {
                setLogged({
                    status: false
                });
            }
        })
        .catch(error => {
            console.log(error)
        });
        console.log(logged.status);
    },[token,logged.status]);

    const LoginComponent = () => {
        if(logged.status) {
            return(
                <form className="form-inline">
                    <Logout />
                </form>
            )
        } else {
            return (
                <form className="form-inline">
                    <Link  className="btn btn-outline-primary my-2 mr-sm-0 mr-md-2 my-sm-0" type="button" to="/login">
                        Iniciar Sesion
                    </Link>
                    <Link className="btn btn-outline-success my-2 my-sm-0" type="button"to="/register">Crear Usuario</Link>
                </form>
            )
        }
    }

    return(
        <div>
            <nav className="navbar navbar-dark bg-dark">
                <a href="/" className="navbar-brand">Lya Electronic</a>
                <LoginComponent />
            </nav>  
        </div>
    )
}

export default HeaderApp;