import React, { useState } from "react";
import Swal from 'sweetalert2'
import axios from 'axios';
import env from 'react-dotenv';

const FormRegister = () => {

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        age: "",
        estado:true,
        active:false,
        address: "",
        password: ""
    });

    const [passwordValidate, setPasswordValidate] = useState({
        password: "",
        confirmPassword: ""
    });
    
    const handleInputChange = (e) => {
        e.preventDefault();
        setFormData({
            ...formData,
            [e.target.name]: e.target.value 
        })
    }

    const handleInputChangePassword = (e) => {
        e.preventDefault();
        setPasswordValidate({
            ...passwordValidate,
            [e.target.name]: e.target.value 
        })
    }

    let validatePassword = () => {
        
        if(
            passwordValidate.password === ""
        ) {
            return false;
        } else if(passwordValidate.confirmPassword === ""){
            return false
        } else if(passwordValidate.password !== passwordValidate.confirmPassword) {
            return false;
        }
        
        return true;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const isPasswordValid = validatePassword();
        if(!isPasswordValid) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error, the passwords are not equals!'
            })
            return;
        } else {
            //console.log(passwordValidate.password);
            setFormData({
                ...formData,
                password: passwordValidate.password
            });
        }

        await callService();
    }

    const callService = () => {
        axios.post(env.API_URL_BASE+'/users',formData)
          .then(function (response) {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'User created successfully',
                showConfirmButton: false,
                timer: 2000
            }).then(( result ) =>{
                //window.location.href="/login";
            });
          })
          .catch(function (error) {
            console.log(error);
          })
        ;
    }

    return(
        <div className="row d-flex flex-column align-items-center justify-content-center">
            <div className=" col-12 col-md-6">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="firstName">Nombre</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            name="firstName" 
                            id="firstName" 
                            required
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Apellido</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            name="lastName" 
                            id="lastName" 
                            required
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            name="email" 
                            id="email" 
                            required
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="age">Edad</label>
                        <input 
                            type="number" 
                            className="form-control" 
                            name="age" 
                            id="age" 
                            required
                            min="1"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Dirección</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            name="address" 
                            id="address" 
                            required
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            name="password" 
                            id="password" 
                            required
                            onChange={handleInputChangePassword}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            name="confirmPassword" 
                            id="confirmPassword" 
                            required
                            onChange={handleInputChangePassword}
                        />
                    </div>
                    <div className="form-group d-flex flex-row align-items-center justify-content-center">
                        <input type="submit" className="btn btn-success mx-auto" name="btnSubmitRegister" id="btnSubmitRegister"/>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default FormRegister;