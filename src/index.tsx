import ReactDOM from "react-dom";
import React from "react";
import {BrowserRouter} from "react-router-dom";
import store from './redux/store';
import App, {FriendsPage, DialogsPage, ProfilePage} from "./App";

export type StateType = {
    profilePage: ProfilePage,
    dialogsPage: DialogsPage,
    friendsPage: FriendsPage
}

const rerenderEntireTree = (state: StateType) => {
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




