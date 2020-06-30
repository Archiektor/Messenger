import ReactDOM from "react-dom";
import React from "react";
import {BrowserRouter} from "react-router-dom";
import store, {AppStateType} from './redux/redux-store';
// import store from './redux/store';
import App from "./App";
import StoreContext from "./StoreContext";

const rerenderEntireTree = (state: AppStateType) => {

    ReactDOM.render(
        <React.StrictMode>
            <BrowserRouter>
                <StoreContext.Provider value={store}>
                    <App state={state}/>
                </StoreContext.Provider>
            </BrowserRouter>
        </React.StrictMode>,
        document.getElementById('root')
    );
}
rerenderEntireTree(store.getState());

// store.subscribe(rerenderEntireTree);
store.subscribe(() => {
    let state = store.getState();
    rerenderEntireTree(state);
})




