/*
import {v1} from "uuid";
// import {StateType} from "../index";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import friendsReducer from "./friends-reducer";
import {AppStateType, AppStateType2} from "./redux-store";
import {UserType} from "./users-reducer";

export type DialogType = {
    key: string,
    id: number,
    name: string,
}
export type MessageType = {
    id: string,
    text: string,
}
export type PostType = {
    id: string,
    message: string,
    likesCount: number
}
export type FriendType = {
    id: string,
    name: string,
    age?: number,
    picture: string,
}

export type ActionType = {
    type: string,string
    newText?: string,
    newMsg?: string,
    userId?: string,
    users?: Array<UserType>,
}

type StoreType = {
    _state: AppStateType2,
    getState: () => AppStateType2,
    _callSubsriber: (state: AppStateType2) => void,
    subscribe: (observer: any) => void,
    dispatch: (action: ActionType) => void,
}

let store: StoreType = {
    _state: {
        profilePage: {
            posts: [
                {id: v1(), message: `Hi, how are you ?`, likesCount: 12},
                {id: v1(), message: `Coffin dance ?`, likesCount: 5},
                {id: v1(), message: `I'm too bored`, likesCount: 2},
                {id: v1(), message: `Goint to night fish`, likesCount: 13},
                {id: v1(), message: `Courage`, likesCount: 0},
            ],
            newPostText: "",
        },
        dialogsPage: {
            messages: [
                {id: v1(), text: "Hello"},
                {id: v1(), text: `WTF i'm doing here...`},
                {id: v1(), text: `Alahabara`},
                {id: v1(), text: `For glory`},
                {id: v1(), text: `Soft kitty`},
            ],
            dialogs: [
                {key: v1(), id: 1, name: "Nikki"},
                {key: v1(), id: 2, name: "Dima"},
                {key: v1(), id: 3, name: "Ania"},
                {key: v1(), id: 4, name: "Tanya"},
                {key: v1(), id: 5, name: "Timur"},
                {key: v1(), id: 6, name: "Roxenne"},
            ],
            newMessageText: "",
        },
        friendsPage: {
            friends: [
                {id: v1(), name: "Nikki", age: 28, picture: "#"},
                {id: v1(), name: "Anna", age: 34, picture: "#"},
                {id: v1(), name: "Sveta", age: 15, picture: "#"},
                {id: v1(), name: "Marco", age: 28, picture: "#"},
                {id: v1(), name: "Greg", age: 34, picture: "#"},
                {id: v1(), name: "Agnes", age: 15, picture: "#"}],
        }
    },
    _callSubsriber(state: AppStateType2) {
        console.log("State changed");
    },

    getState() {
        return this._state;
    },
    subscribe(observer: (state: AppStateType2) => void) {
        this._callSubsriber = observer;
    },

    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.friendsPage = friendsReducer(this._state.friendsPage, action);

        this._callSubsriber(this._state);
    }
}

export default store;
// !!! window.store = store;

*/
export default 1;
