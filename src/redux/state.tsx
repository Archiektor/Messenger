import {v1} from "uuid";
import {AppType} from "../index";

/*type SubscribeType = {
    subscribe: () => void
}*/

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
    type: string,
    newText?: string,
    newMsg?: string,
}

type StoreType = {
    _state: AppType,
    getState: () => AppType,
    _callSubsriber: (state: AppType) => void,
    subscribe: (observer: any) => void,
    dispatch: (action: ActionType) => void,
}

let store: StoreType = {
    _state: {
        profilePage: {
            posts: [
                {id: v1(), message: `Hi, how are you ?`, likesCount: 12},
                {id: v1(), message: `Ccom man, wtf ?`, likesCount: 5},
                {id: v1(), message: `I'm a little pussy`, likesCount: 4},
                {id: v1(), message: `post#4`, likesCount: 13},
                {id: v1(), message: `post#5`, likesCount: 0},
            ],
            newPostText: "",
        },
        messagesPage: {
            messages: [
                {id: v1(), text: "Hello"},
                {id: v1(), text: `WTF i'm doing here...`},
                {id: v1(), text: `Alahabara`},
                {id: v1(), text: `For courage`},
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
    _callSubsriber(state: AppType) {
        console.log("State changed");
    },

    getState() {
        return this._state;
    },
    subscribe(observer: (state: AppType) => void) {
        this._callSubsriber = observer;
        // debugger;
    },

    dispatch(action) {
        // dispatch => send Object {type: "ADD-POST"}
        // switch case or assoative array
        switch (action.type) {
            case "ADD-POST":
                let modPosts;
                modPosts = [...this._state.profilePage.posts, {
                    id: v1(),
                    message: this._state.profilePage.newPostText,
                    likesCount: 0
                }]
                this._state.profilePage.posts = modPosts;
                this._state.profilePage.newPostText = "";
                this._callSubsriber(this._state);
                break;
            case "UPDATE-NEW-POST-TEXT":
                if (action.newText != null) {
                    this._state.profilePage.newPostText = action.newText;
                }
                this._callSubsriber(this._state);
                break;
            case "ADD-MESSAGE":
                let modMessages;
                modMessages = [...this._state.messagesPage.messages, {
                    id: v1(),
                    text: this._state.messagesPage.newMessageText,
                }]
                this._state.messagesPage.messages = modMessages;
                this._state.messagesPage.newMessageText = "";
                this._callSubsriber(this._state);
                break;
            case "Update-New-Message-Text":
                if (action.newMsg != null) {
                    this._state.messagesPage.newMessageText = action.newMsg;
                }
                this._callSubsriber(this._state);
        }
    }
}


export default store;
// !!! window.store = store;








