import {applyMiddleware, combineReducers, createStore, Store} from "redux";
import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import friendsReducer from "./friends-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleware from "redux-thunk";

// наш reducers это фактически state = {profilePage: [data], dialogsPage: [data], friendsPage: [data]}
let reducers = combineReducers({
    //combinre all reducers in one object = state
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    friendsPage: friendsReducer,
    auth: authReducer,
});

export type AppStateType = ReturnType<typeof reducers>

let store: Store = createStore(reducers, applyMiddleware(thunkMiddleware));

// @ts-ignore
window.store = store;

export default store;