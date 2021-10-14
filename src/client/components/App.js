import React, { useState, useEffect } from 'react';
import Menu from './Menu';
import LoginFormComponent from './users/LoginFormComponent';

const App = (props) => {
    return(
        <div>
            <Menu />
            <LoginFormComponent />
        </div>
    )
}

export default App;