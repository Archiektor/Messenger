import React from "react";
import {Route} from "react-router-dom"

import "./app.css";
import Header from "./components/header";
import Navbar from "./components/navbar";
import Profile from "./components/profile";
import News from "./components/news";
import Music from "./components/music";
import Settings from "./components/settings";
import {DialogType, FriendType, MessageType, PostType} from "./redux/store"
import store from "./redux/redux-store";
import DialogsContainer from "./components/dialogs/dialogsContainer";
import UsersContainer from "./components/users/UsersContainer";

export type ProfilePage = {
    posts: Array<PostType>,
    newPostText: string,
}
export type DialogsPage = {
    messages: Array<MessageType>,
    dialogs: Array<DialogType>,
    newMessageText: string,
}
export type FriendsPage = {
    friends: Array<FriendType>
}

type PropsType = {
}

const App: React.FC<PropsType> = () => {
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