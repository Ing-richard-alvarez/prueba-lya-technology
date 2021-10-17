import React from "react";

const Logout = () => {

    const deleteSession = () => {
        localStorage.removeItem('tokenSession');

        if(localStorage.getItem('tokenSession') !== undefined) {
            window.location.href="/login";
        }
    }

    return (
        <button  className="btn btn-outline-primary my-2 mr-sm-0 mr-md-2 my-sm-0" type="button" onClick={deleteSession}>
            Cerrar Sesion
        </button>
    )
}

export default Logout;