import React from "react";
import {Route} from "react-router-dom"

import "./app.css";
import Header from "./components/header";
import Navbar from "./components/navbar";
import Dialogs from "./components/dialogs";
import Profile from "./components/profile";
import News from "./components/news";
import Music from "./components/music";
import Settings from "./components/settings";
import {ActionType, DialogType, FriendType, MessageType, PostType} from  "./redux/store"

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

export type AppType = {
    state: {
        profilePage: ProfilePage,
        dialogsPage: DialogsPage,
        friendsPage: FriendsPage
    },
    dispatch: (action: ActionType) => void,
}

const App: React.FC<AppType> = (props) => {
    const {profilePage, dialogsPage, friendsPage} = props.state;

    return (
        <div className="app-wrapper">
            <Header/>
            <Navbar data={friendsPage}/>
            <div className="app-wrapper-content">
                <Route path='/profile' render={() => <Profile
                    dispatch={props.dispatch}
                    newPostText={profilePage.newPostText}
                    posts={profilePage.posts}/>}/>

                <Route path='/dialogs' render={() => <Dialogs
                    data={dialogsPage}
                    dispatch={props.dispatch}
                />}/>
                <Route path='/news' render={() => <News/>}/>
                <Route path='/music' render={() => <Music/>}/>
                <Route path='/settings' render={() => <Settings/>}/>
            </div>
        </div>
    )
}

export default App;