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
    let partOfStateCopy: ProfilePage;
    switch (action.type) {
        case ADD_POST: {
            partOfStateCopy = {...partOfState, posts: [...partOfState.posts],};
            /*            let modPosts;
                        modPosts = [...partOfState.posts, {
                            id: v1(),
                            message: partOfStateCopy.newPostText,
                            likesCount: 0
                        }]*/
            partOfStateCopy.posts = [...partOfStateCopy.posts, {id: v1(), message: partOfStateCopy.newPostText, likesCount: 0}];
            partOfStateCopy.newPostText = "";
            return partOfStateCopy;
        }
        case UPDATE_NEW_POST_TEXT: {
            partOfStateCopy = {...partOfState};
            if (action.newText) {
                partOfStateCopy.newPostText = action.newText;
            }
            return partOfStateCopy;
        }
        default:
            return partOfState;
    }
}

export default profileReducer;