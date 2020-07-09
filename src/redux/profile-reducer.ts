import {v1} from "uuid";

const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
const SET_USER_PROFILE = "SET_USER_PROFILE";

type addPostACType = {
    type: typeof ADD_POST,
}
type updateNewPostTextACType = {
    type: typeof UPDATE_NEW_POST_TEXT,
    newText: string,
}
type setUserProfileACType = {
    type: typeof SET_USER_PROFILE,
    profile: UserProfileType,
}
type ProfileReducerActionType = addPostACType | updateNewPostTextACType | setUserProfileACType;

export type PostType = {
    id: string,
    message: string,
    likesCount: number
}
export type ProfilePage = {
    posts: Array<PostType>,
    newPostText: string,
    profile: UserProfileType,
}
export type UserProfileType = null | {
    aboutMe: string,
    contacts: {
        facebook: string,
        website: null | string,
        vk: string,
        twitter: string,
        instagram: string,
        youtube: null | string,
        github: string,
        mainLink: null | string,
    },
    lookingForAJob: boolean,
    lookingForAJobDescription: string,
    fullName: string,
    userId: number,
    photos: {
        small: string,
        large: string,
    }
}

export const addPostAC = (): addPostACType => ({type: ADD_POST});
export const updateNewPostTextAC = (modifiedText: string): updateNewPostTextACType => ({
    type: UPDATE_NEW_POST_TEXT,
    newText: modifiedText
});
export const setUserProfile = (profile: UserProfileType): setUserProfileACType => ({
    type: SET_USER_PROFILE,
    profile: profile,
})

let initialState = {
    posts: [
        {id: v1(), message: `Hi, how are you ?`, likesCount: 12},
        {id: v1(), message: `Coffin dance ?`, likesCount: 5},
        {id: v1(), message: `I'm too bored`, likesCount: 2},
        {id: v1(), message: `Goint to night fish`, likesCount: 13},
        {id: v1(), message: `Courage`, likesCount: 0},
    ],
    newPostText: "",
    profile: null,
}

const profileReducer = (partOfState: ProfilePage = initialState, action: ProfileReducerActionType): ProfilePage => {
    let partOfStateCopy: ProfilePage;
    switch (action.type) {
        case ADD_POST: {
            partOfStateCopy = {...partOfState, posts: [...partOfState.posts],};
            partOfStateCopy.posts = [...partOfStateCopy.posts, {
                id: v1(),
                message: partOfStateCopy.newPostText,
                likesCount: 0
            }];
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
        case SET_USER_PROFILE: {
            return {...partOfState, profile: action.profile};
        }
        default:
            return partOfState;
    }
}

export default profileReducer;