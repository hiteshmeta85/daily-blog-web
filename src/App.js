import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './index.css'
import {Home} from './routes/Home';
import {Delete} from "./routes/DeleteBlog";
import {SignUp} from "./routes/SignUp";
import {UpdateAndDelete} from "./routes/UpdateAndDelete";
import {EditBlog} from "./routes/EditBlog";
import httpClient from "./utilities/httpClient";
import {Header} from "./components/Header";
import {NotFound} from "./components/NotFound";
import {Login} from "./routes/Login";
import {IndividualBlog} from "./components/IndividualBlog";
import Compose from "./routes/Compose";

const checkSession = async setIsLoggedIn => {
    try {
        let result = await httpClient({
            method: 'GET',
            url: `${process.env.REACT_APP_API_HOST}/session`,
        });
        if (result) {
            return setIsLoggedIn(true);
        }
        return setIsLoggedIn(false);
    } catch (err) {
        return setIsLoggedIn(false);
    }
};

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    checkSession(setIsLoggedIn)

    return (
        <Router>
            <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
            <Switch>
                <Route exact path='/signup'>
                    <SignUp isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
                </Route>
                <Route exact path='/login'>
                    <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
                </Route>
                <Route exact path='/'>
                    <Home/>
                </Route>
                <Route exact path='/update'>
                    <UpdateAndDelete/>
                </Route>
                <Route exact path='/update/:id'>
                    <EditBlog/>
                </Route>
                <Route exact path='/blog/:id'>
                    <IndividualBlog/>
                </Route>
                <Route exact path='/delete/:id'>
                    <Delete/>
                </Route>
                <Route exact path='/compose'>
                    {isLoggedIn?<Compose/>:<div className='container'>Login First</div>}
                    </Route>
                <Route path='*'>
                    <NotFound/>
                </Route>
            </Switch>
        </Router>
    );
}

export default App

