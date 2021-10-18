import React, { useEffect,useState } from "react";
import jwt from 'jsonwebtoken';
import env from 'react-dotenv'
import axios from "axios";
import Swal from "sweetalert2";

const FormLogin = () => {

    const [formData, setFormData] = useState({
        email: "",
        password: ""
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
                window.location.href="/user-list"
            }
        })
        .catch(error => {
            console.log(error)
        });
    },[token]);

    const handleInputChange = (e) => {
        e.preventDefault();
        setFormData({
            ...formData,
            [e.target.name]: e.target.value 
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        await callService();
    }

    const callService = () => {
        axios.post('http://127.0.0.1:3001/api/v1/authorization',formData)
          .then(function (response) {
            const { token } = response.data;

            if(token !== "") {
                //creating localstorage
                localStorage.setItem("tokenSession",token);

                //redirect
                window.location.href = "/user-list";
            }
            
          })
          .catch(function (error) {
            console.log(error.response.data.error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data.error
            })
            return
          })
        ;
    }

    return(
        <div className="row d-flex flex-column align-items-center justify-content-center">
            <div className=" col-12 col-md-6">
                <form onSubmit={handleSubmit}>
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
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            name="password" 
                            id="password" 
                            required
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group d-flex flex-row align-items-center justify-content-center">
                        <input type="submit" className="btn btn-success mx-auto" name="btnSubmitLogin" id="btnSubmitLogin"/>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default FormLogin;