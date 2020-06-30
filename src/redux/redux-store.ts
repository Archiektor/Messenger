import {combineReducers, createStore} from "redux";
import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import friendsReducer from "./friends-reducer";
import {DialogsPage, FriendsPage, ProfilePage} from "../App";

// наш reducers это фактически state = {profilePage: [data], dialogsPage: [data], friendsPage: [data]}
let reducers = combineReducers({
    //combinre all reducers in one object
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    friendsPage: friendsReducer,
});

export type AppStateType = ReturnType<typeof reducers>

export type AppStateType2 = {
    profilePage: ProfilePage,
    dialogsPage: DialogsPage,
    friendsPage: FriendsPage
}


let store = createStore(reducers);

export default store;