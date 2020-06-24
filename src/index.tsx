import ReactDOM from "react-dom";
import React from "react";
import {BrowserRouter} from "react-router-dom";

import {addMessage, addPost, state, subscribe, updateNewMessageText, updateNewPostText} from "./redux/state";
import App, {FriendsPage, MessagesPage, ProfilePage} from "./App";

export type AppType = {
    profilePage: ProfilePage,
    messagesPage: MessagesPage,
    friendsPage: FriendsPage
}

const rerenderEntireTree = (state: AppType) => {
    ReactDOM.render(
        <React.StrictMode>
            <BrowserRouter>
                <App state={state} addPost={addPost} updateNewPostText={updateNewPostText} addMessage={addMessage}
                     updateNewMessageText={updateNewMessageText}/>
            </BrowserRouter>
        </React.StrictMode>,
        document.getElementById('root')
    );
}
rerenderEntireTree(state);
subscribe(rerenderEntireTree);




