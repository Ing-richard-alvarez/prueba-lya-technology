import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from 'axios';
import env from 'react-dotenv';


const ChangeStatusUser =  (prop) => {
    
    const [activeUser, setActiveUser] = useState({
        active: false
    });

    useEffect(() => {
        const { active } = prop.userProp;
        setActiveUser({
            active
        });
    },[prop.userProp]);

    const handleSubmit = async () => {
        const { _id } = prop.userProp;

        Swal.fire({
            title: (activeUser.active)? 'Are you sure, Do you want disable user' : 'Are you sure, Do you want enable user',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: (activeUser.active)? 'Yes, disable it!': 'Yes, enable it!',
          }).then(async (result) => {
            if (result.isConfirmed) {
              await callService(_id)
            }
          })
        ;
        
    }


    const callService = async (userId) => {
        const token = localStorage.getItem('tokenSession');
        
        let config = {
            headers: {
              'Authorization': 'Bearer ' + token
            }
        }

        let data = {
            active: !activeUser.active
        }

        axios.patch(
            env.API_URL_BASE+'/users/'+userId+'/active',
            data,
            config
        ).then(res => {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: (activeUser.active)?'User disabled successfully' : 'User enabled successfully',
                showConfirmButton: false,
                timer: 2000
            }).then(res => {
                window.location.reload();
            })
        }).catch(error => {
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
    }

    return(
        <button type="button" className='btn btn-primary' onClick={handleSubmit}>{(activeUser.active?'Disable':'Enable')}</button>
    );
}

export default ChangeStatusUser;