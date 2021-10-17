import React from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

//Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PageNotFound from './pages/PageNotFound';
import HeaderApp from './components/HeaderApp';
import UserList from './pages/UserList';

function App() {

    
    
    return (
        <div className="App">
            <Router>
                <HeaderApp />
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route  path="/login">
                        <Login />
                    </Route>
                    <Route path="/register">
                        <Register />
                    </Route>
                    <Route path="/user-list">
                        <UserList />
                    </Route>
                    <Route>
                        <PageNotFound />
                    </Route>
                </Switch>
            </Router>
            
        </div>
    );
}

export default App;
