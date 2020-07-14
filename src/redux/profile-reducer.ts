import {v1} from "uuid";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";
import {ProfileApi} from "../components/api/api";

const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";

type addPostACType = {
    type: typeof ADD_POST,
    newPostBody: string,
}
type setUserProfileACType = {
    type: typeof SET_USER_PROFILE,
    profile: UserProfileType,
}
type setStatusACType = {
    type: typeof SET_STATUS,
    status: string,
}
type ProfileReducerActionType = addPostACType | setUserProfileACType | setStatusACType;

export type PostType = {
    id: string,
    message: string,
    likesCount: number
}
export type ProfilePage = {
    posts: Array<PostType>,
    newPostText: string,
    profile: UserProfileType,
    status: string,
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

export const addPostAC = (text: string): addPostACType => ({type: ADD_POST, newPostBody: text});
export const setUserProfile = (profile: UserProfileType): setUserProfileACType => ({
    type: SET_USER_PROFILE,
    profile: profile,
})
export const setStatus = (status: string): setStatusACType => ({
    type: SET_STATUS,
    status: status,
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
    status: "",
}

const profileReducer = (partOfState: ProfilePage = initialState, action: ProfileReducerActionType): ProfilePage => {
    let partOfStateCopy: ProfilePage;
    switch (action.type) {
        case ADD_POST: {
            partOfStateCopy = {...partOfState, posts: [...partOfState.posts],};
            partOfStateCopy.posts = [...partOfStateCopy.posts, {
                id: v1(),
                message: action.newPostBody,
                likesCount: 0
            }];
            return partOfStateCopy;
        }
        case SET_USER_PROFILE: {
            return {...partOfState, profile: action.profile};
        }
        case SET_STATUS: {
            return {...partOfState, status: action.status};
        }
        default:
            return partOfState;
    }
}

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ProfileReducerActionType>;

export const showProfileThunkCreator = (userId: number): ThunkType => {
    return async (dispatch) => {
        let data = await ProfileApi.showProfile(userId)
        dispatch(setUserProfile(data));
    }
}

export const getStatusThunkCreator = (userId: number): ThunkType => {
    return async (dispatch) => {
        let data = await ProfileApi.getStatus(userId);
        dispatch(setStatus(data));
    }
}

export const updateStatusThunkCreator = (status: string): ThunkType => {
    return async (dispatch) => {
        let data = await ProfileApi.updateStatus(status);
        if (data.resultCode === 0) {
            dispatch(setStatus(status));
        }
    }
}

export default profileReducer;