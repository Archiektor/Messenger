import {v1} from 'uuid';
import {ThunkAction} from 'redux-thunk';
import {AppStateType} from './redux-store';
import {ProfileApi, ResultCodesEnum} from '../components/api/api';
import {ProfileDataForm} from '../components/profile/ProfileDataForm/ProfileDataForm';
import {stopSubmit} from 'redux-form';

const deepCopyFunction = (incomeObj: any) => {
    let returnedObj: any, key: any, value: any;
    if (typeof incomeObj !== 'object' || incomeObj === null) {
        return incomeObj // Return the value if incomeObj is not an object
    }
    returnedObj = Array.isArray(incomeObj) ? [] : {}

    for (key in incomeObj) {
        value = incomeObj[key]
        returnedObj[key] = deepCopyFunction(value)
    }
    return returnedObj
}

const ADD_POST = 'network/profile/ADD-POST';
const SET_USER_PROFILE = 'network/profile/SET_USER_PROFILE';
const SET_STATUS = 'network/profile/SET_STATUS';
const DELETE_POST = `network/profile/DELETE_POST`;
const SAVE_PHOTOS_SUCCESS = 'network/profile/SAVE_PHOTOS_SUCCESS';

type addPostACType = { type: typeof ADD_POST, newPostBody: string, }
type setUserProfileACType = {
    type: typeof SET_USER_PROFILE,
    profile: UserProfileType,
}
type setStatusACType = { type: typeof SET_STATUS, status: string, }
type deletePostACType = { type: typeof DELETE_POST, postId: string, }
type savePhotoACType = { type: typeof SAVE_PHOTOS_SUCCESS, photos: { small: string, large: string, } }

type ProfileReducerActionType = addPostACType | deletePostACType | setUserProfileACType |
    setStatusACType | savePhotoACType;

export type PostType = {
    id: string,
    message: string,
    likesCount: number
}
type ContactsType = {
    facebook: string,
    website: null | string,
    vk: string,
    twitter: string,
    instagram: string,
    youtube: null | string,
    github: string,
    mainLink: null | string,
}

export type UserProfileType = null | {
    aboutMe: string,
    contacts: ContactsType,
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
export const deletePost = (postId: string): deletePostACType => ({type: DELETE_POST, postId})
export const savePhoto = (photos: {
    small: string, large: string
}): savePhotoACType => ({type: SAVE_PHOTOS_SUCCESS, photos})

export type ProfilePageType = typeof initialState;

let initialState = {
    posts: [
        {id: v1(), message: `Hi, how are you ?`, likesCount: 12},
        {id: v1(), message: `Coffin dance ?`, likesCount: 5},
        {id: v1(), message: `I'm too bored`, likesCount: 2},
        {id: v1(), message: `Goint to night fish`, likesCount: 13},
        {id: v1(), message: `Courage`, likesCount: 0},
    ] as Array<PostType>,
    newPostText: '',
    profile: null as UserProfileType | null,
    status: '',
}

const profileReducer = (partOfState = initialState, action: ProfileReducerActionType): ProfilePageType => {
    let partOfStateCopy: ProfilePageType;
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
        case DELETE_POST: {
            return {...partOfState, posts: partOfState.posts.filter(p => p.id !== action.postId)}
        }
        case SAVE_PHOTOS_SUCCESS: {
            let newCopyOfState = deepCopyFunction(partOfState);
            newCopyOfState.profile.photos.small = action.photos.small;
            newCopyOfState.profile.photos.large = action.photos.large;
            return newCopyOfState;
        }
        default:
            return partOfState;
    }
}

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ProfileReducerActionType>;

export const showProfileThunkCreator = (userId: number): ThunkType => {
    return async (dispatch) => {
        const data = await ProfileApi.showProfile(userId)
        dispatch(setUserProfile(data));
    }
}

export const getStatusThunkCreator = (userId: number): ThunkType => {
    return async (dispatch) => {
        const data = await ProfileApi.getStatus(userId);
        dispatch(setStatus(data));
    }
}

export const updateStatusThunkCreator = (status: string): ThunkType => {
    return async (dispatch) => {
        const data = await ProfileApi.updateStatus(status);
        if (data.resultCode === ResultCodesEnum.Success) {
            dispatch(setStatus(status));
        }
    }
}

export const savePhotoThunkCreator = (file: File): ThunkType => {
    return async (dispatch) => {
        const data = await ProfileApi.savePhoto(file);
        if (data.resultCode === ResultCodesEnum.Success) {
            dispatch(savePhoto(data.data.photos));
        }
    }
}

export const saveProfileThunkCreator = (formData: ProfileDataForm): ThunkType => {
    return async (dispatch, getState) => {
        const userId = getState().auth.id;
        //debugger;
        const data = await ProfileApi.saveProfile(formData);
        if (data.resultCode === ResultCodesEnum.Success) {
            await dispatch(showProfileThunkCreator(userId!))
        } else {
            let errMsg = data.messages.length > 0 ? data.messages[0] : 'Unknown error';
            // @ts-ignore
            dispatch(stopSubmit('edit-profile', {_error: errMsg}))
        }
    }
}

export default profileReducer;