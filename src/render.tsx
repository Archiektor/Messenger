import React from 'react';
import ReactDOM from 'react-dom';
import App, {FriendsPage, MessagesPage, ProfilePage} from "./App";
import {addMessage, addPost, updateNewMessageText, updateNewPostText} from "./redux/state";
import {BrowserRouter} from "react-router-dom";

export type AppType = {
        profilePage: ProfilePage,
        messagesPage: MessagesPage,
        friendsPage: FriendsPage
}

export const rerenderEntireTree = (state: AppType) => {
    ReactDOM.render(
        <React.StrictMode>
            <BrowserRouter>
                <App state={state} addPost={addPost} updateNewPostText={updateNewPostText} addMessage={addMessage} updateNewMessageText={updateNewMessageText}/>
            </BrowserRouter>
        </React.StrictMode>,
        document.getElementById('root')
    );
}