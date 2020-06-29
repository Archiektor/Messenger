import ReactDOM from "react-dom";
import React from "react";
import {BrowserRouter} from "react-router-dom";
import store from './redux/state';
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
                <App state={state} dispatch={store.dispatch.bind(store)}/>
            </BrowserRouter>
        </React.StrictMode>,
        document.getElementById('root')
    );
}
rerenderEntireTree(store.getState());
store.subscribe(rerenderEntireTree);




