import {ActionType} from "./store";
import {v1} from "uuid";
import {ProfilePage} from "../App";

const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";

export const addPostActionCreator = (): ActionType => ({type: ADD_POST});
export const updateNewPostTextActionCreator = (modifiedText: string): ActionType => ({
    type: UPDATE_NEW_POST_TEXT,
    newText: modifiedText
});

let initialState = {
    posts: [
        {id: v1(), message: `Hi, how are you ?`, likesCount: 12},
        {id: v1(), message: `Coffin dance ?`, likesCount: 5},
        {id: v1(), message: `I'm too bored`, likesCount: 2},
        {id: v1(), message: `Goint to night fish`, likesCount: 13},
        {id: v1(), message: `Courage`, likesCount: 0},
    ],
    newPostText: "",
}

const profileReducer = (partOfState: ProfilePage = initialState, action: ActionType): ProfilePage => {
    switch (action.type) {
        case ADD_POST:
            let modPosts;
            modPosts = [...partOfState.posts, {
                id: v1(),
                message: partOfState.newPostText,
                likesCount: 0
            }]
            partOfState.posts = modPosts;
            partOfState.newPostText = "";
            // this._callSubsriber(this._state);
            return partOfState;
        case UPDATE_NEW_POST_TEXT:
            if (action.newText != null) {
                partOfState.newPostText = action.newText;
            }
            // this._callSubsriber(this._state);
            return partOfState;
        default:
            return partOfState;
    }
}

export default profileReducer;