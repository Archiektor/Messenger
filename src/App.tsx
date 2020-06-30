import React from "react";
import {Route} from "react-router-dom"

import "./app.css";
import Header from "./components/header";
import Navbar from "./components/navbar";
import Profile from "./components/profile";
import News from "./components/news";
import Music from "./components/music";
import Settings from "./components/settings";
import {ActionType, DialogType, FriendType, MessageType, PostType} from "./redux/store"
import {AppStateType} from "./redux/redux-store";
import DialogsContainer from "./components/dialogs/dialogsContainer";
import {Store} from "redux";

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
    state: AppStateType,
    dispatch: (action: ActionType) => void,
    store: Store,
}

const App: React.FC<PropsType> = (props) => {
    // debugger;
    const {friendsPage} = props.state;

    return (
        <div className="app-wrapper">
            <Header/>
            <Navbar data={friendsPage}/>
            <div className="app-wrapper-content">
                <Route path='/profile' render={() => <Profile
                    store={props.store}
                />}/>

                <Route path='/dialogs' render={() => <DialogsContainer
                    store={props.store}
                />}/>
                <Route path='/news' render={() => <News/>}/>
                <Route path='/music' render={() => <Music/>}/>
                <Route path='/settings' render={() => <Settings/>}/>
            </div>
        </div>
    )
}

export default App;