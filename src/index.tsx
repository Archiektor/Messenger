import ReactDOM from "react-dom";
import React from "react";
import {BrowserRouter} from "react-router-dom";
import store from './redux/redux-store';
// import store from './redux/store';
import App from "./App";
import {Provider} from "react-redux";

// const rerenderEntireTree = (state: AppStateType) => {

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            {/*<StoreContext.Provider value={store}>*/}
            <Provider store={store}>
                <App/>
            </Provider>
            {/*</StoreContext.Provider>*/}
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
// }
// rerenderEntireTree(store.getState());

// store.subscribe(rerenderEntireTree);
/*store.subscribe(() => {
    let state = store.getState();
    rerenderEntireTree(state);
})*/




