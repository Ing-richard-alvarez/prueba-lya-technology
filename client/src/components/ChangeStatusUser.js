import React from "react";



const ChangeStatusUser = (prop) => {
    
    const callService = () => {
        const { _id } = prop.userProp;
        console.log(_id);
    }

    return(
        <button type="button" className='btn btn-primary' onClick={callService}>Enable</button>
    );
}

export default ChangeStatusUser;