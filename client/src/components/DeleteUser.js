import React from "react";



const DeleteUser = (prop) => {
    
    const callService = () => {
        const { _id } = prop.userProp;
        console.log(_id);
    }

    return(
        <button type="button" className='btn btn-danger' onClick={callService}>Delete</button>
    );
}

export default DeleteUser;