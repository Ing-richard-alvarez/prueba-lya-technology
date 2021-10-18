import React from "react";
import Swal from 'sweetalert2';  
import axios from 'axios';
import env from 'react-dotenv';

const DeleteUser = (prop) => {
    
    const handleSubmit = async () => {
        const { _id } = prop.userProp;
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then(async (result) => {
            if (result.isConfirmed) {
              await callService(_id);
            }
          })
        ;
    }

    const callService = (userId) => {
        const token = localStorage.getItem('tokenSession');
        
        let config = {
            headers: {
              'Authorization': 'Bearer ' + token
            }
        }

        axios.delete(
            env.API_URL_BASE+'/users/'+userId,
            config
        ).then(res => {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'User deleted successfully',
                showConfirmButton: false,
                timer: 2000
            }).then(res => {
                window.location.reload();
            })
        }).catch(err => {

        })
    }

    return(
        <button type="button" className='btn btn-danger' onClick={handleSubmit}>Delete</button>
    );
}

export default DeleteUser;