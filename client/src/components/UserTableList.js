import React, {  useEffect, useState } from "react";
import axios from "axios";
import env from 'react-dotenv';
import jwt from 'jsonwebtoken';
import Swal from 'sweetalert2';
import ChangeStatusUser from "./ChangeStatusUser";
import DeleteUser from "./DeleteUser";

const UserTableList = () => {
    
    const [userList, setUserList] = useState({
        users: []
    });

    const verifyToken = async ( token ) => {
        try {
            return jwt.verify(token,env.JWT_SECRET);
        } catch (e) {
            return null;
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('tokenSession');
      
        //Validate token
        verifyToken(token)
            .then(tokenData => {

                //console.log(tokenData);

                let config = {
                    headers: {
                      'Authorization': 'Bearer ' + token
                    }
                }

                // send request to server
                if(tokenData._id !== undefined) {
                    axios.get( 
                        env.API_URL_BASE+'/users',
                        config
                      )
                      .then( ( response ) => {
                        setUserList({users: response.data.list});
                      } )
                    ;
                }

            }).catch(err => {
                console.log('error ',err);
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Oops...',
                    text: "Please, Login again!",
                    showConfirmButton: false,
                    timer: 3000
                }).then(( result ) =>{
                    window.location.href="/login";
                });
            })
        ;
        
    },[]);

    
    return(
        <div className="row">
            <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userList.users.map((user,index) => (
                            <tr key={user.email}>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.email}</td>
                                <td>{user.age}</td>
                                <td>{user.active?"Active":"Inactive"}</td>
                                <td>
                                    <div className="d-flex flex-row">
                                        <div className="col-2"><ChangeStatusUser userProp={user}/></div>
                                        <div className="col-2"><DeleteUser userProp={user}/></div>
                                    </div>
                                </td>
                            </tr>

                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default UserTableList;