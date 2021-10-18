import React, {  useEffect, useState } from "react";
import axios from "axios";
import env from 'react-dotenv';
import Swal from 'sweetalert2';
import ChangeStatusUser from "./ChangeStatusUser";
import DeleteUser from "./DeleteUser";

const UserTableList = () => {
    
    const [userList, setUserList] = useState({
        users: []
    });

    useEffect(() => {
        const token = localStorage.getItem('tokenSession');
        
        let config = {
            headers: {
              'Authorization': 'Bearer ' + token
            }
        }

        // send request to server
        axios.get( 
            env.API_URL_BASE+'/users',
            config
          )
          .then( ( response ) => {
            setUserList({users: response.data.list});
          } )
          .catch(( error ) => {
                const { status, data } = error.response
                //console.log(error.response);
                if(status === 409) {
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'Oops...',
                        text: data.error,
                        showConfirmButton: false,
                        timer: 3000
                    }).then(( result ) =>{
                        window.location.href="/login";
                    });
                }
                
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