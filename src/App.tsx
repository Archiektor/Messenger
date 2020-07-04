import React from "react";
import {Route} from "react-router-dom"

import "./app.css";
import Header from "./components/header";
import Navbar from "./components/navbar";
import Profile from "./components/profile";
import News from "./components/news";
import Music from "./components/music";
import Settings from "./components/settings";
import store from "./redux/redux-store";
import DialogsContainer from "./components/dialogs/dialogsContainer";
import UsersContainer from "./components/users/UsersContainer";


const App = () => {
    // debugger;
    const {friendsPage} = store.getState();

    return (
        <div className="app-wrapper">
            <Header/>
            <Navbar data={friendsPage}/>
            <div className="app-wrapper-content">
                <Route path='/profile' render={() => <Profile/>}/>

                <Route path='/dialogs' render={() => <DialogsContainer/>}/>

                <Route path='/users' render={() => <UsersContainer/>}/>

                <Route path='/news' render={() => <News/>}/>
                <Route path='/music' render={() => <Music/>}/>
                <Route path='/settings' render={() => <Settings/>}/>
            </div>
        </div>
    )
}

export default App;