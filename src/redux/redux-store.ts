import {combineReducers, createStore, Store} from "redux";
import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import friendsReducer from "./friends-reducer";
import usersReducer from "./users-reducer";
import {DialogsPage, FriendsPage, ProfilePage} from "../App";

// наш reducers это фактически state = {profilePage: [data], dialogsPage: [data], friendsPage: [data]}
let reducers = combineReducers({
    //combinre all reducers in one object = state
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    friendsPage: friendsReducer,
});

export type AppStateType = ReturnType<typeof reducers>

// this later to refactor
export type AppStateType2 = {
    profilePage: ProfilePage,
    dialogsPage: DialogsPage,
    friendsPage: FriendsPage
}

let store: Store = createStore(reducers);

export default store;