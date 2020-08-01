import ReactDOM from 'react-dom';
import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import store from './redux/redux-store';
import App from './App';
import {Provider} from 'react-redux';

// const rerenderEntireTree = (state: AppStateType) => {

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Provider store={store}>
                <App/>
            </Provider>
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




