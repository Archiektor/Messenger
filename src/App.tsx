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
import {DialogType, FriendType, MessageType, PostType} from "./redux/state";

export type ProfilePage = {
    posts: Array<PostType>,
    newPostText: string,
}
export type MessagesPage = {
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
        messagesPage: MessagesPage,
        friendsPage: FriendsPage
    },
    addPost: () => void,
    updateNewPostText: (newText: string) => void,
    addMessage: () => void,
    updateNewMessageText: (text: string) => void,
}

const App: React.FC<AppType> = (props) => {
    const {profilePage, messagesPage, friendsPage} = props.state;

    return (
            <div className="app-wrapper">
                <Header/>
                <Navbar data={friendsPage}/>
                <div className="app-wrapper-content">
                    <Route path='/profile' render={() => <Profile updateNewPostText={props.updateNewPostText} newPostText={profilePage.newPostText} addPost={props.addPost} posts={profilePage.posts}/>}/>
                    <Route path='/dialogs' render={() => <Dialogs data={messagesPage} addMessage={props.addMessage} updateNewMessageText={props.updateNewMessageText}/>}/>
                    <Route path='/news' render={() => <News/>}/>
                    <Route path='/music' render={() => <Music/>}/>
                    <Route path='/settings' render={() => <Settings/>}/>
                </div>
            </div>
    )
}

export default App;