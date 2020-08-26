import {v1} from 'uuid';
import {ThunkAction} from 'redux-thunk';
import {AppStateType, InferActionsType} from './redux-store';
import {ResultCodesEnum} from '../components/api/api';
import {ProfileDataForm} from '../components/profile/ProfileDataForm/ProfileDataForm';
import {stopSubmit} from 'redux-form';
import {ProfileApi} from '../components/api/profile-api';

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

enum ProfileConst {
    ADD_POST = 'network/profile/ADD_POST',
    SET_USER_PROFILE = 'network/profile/SET_USER_PROFILE',
    SET_STATUS = 'network/profile/SET_STATUS',
    DELETE_POST = `network/profile/DELETE_POST`,
    SAVE_PHOTOS_SUCCESS = 'network/profile/SAVE_PHOTOS_SUCCESS'
}

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
export const profileActions = {
    addPostAC: (text: string) => ({type: ProfileConst.ADD_POST, newPostBody: text} as const),
    setUserProfile: (profile: UserProfileType) => ({
        type: ProfileConst.SET_USER_PROFILE,
        profile: profile,
    } as const),
    setStatus: (status: string) => ({
        type: ProfileConst.SET_STATUS,
        status: status,
    } as const),
    deletePost: (postId: string) => ({type: ProfileConst.DELETE_POST, postId}),
    savePhoto: (photos: {
        small: string, large: string
    }) => ({type: ProfileConst.SAVE_PHOTOS_SUCCESS, photos} as const),
}

type ProfileReducerActionType = InferActionsType<typeof profileActions>;

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

const profileReducer = (partOfState = initialState, action: any): ProfilePageType => {
    let partOfStateCopy: ProfilePageType;
    switch (action.type) {
        case ProfileConst.ADD_POST: {
            partOfStateCopy = {...partOfState, posts: [...partOfState.posts],};
            partOfStateCopy.posts = [...partOfStateCopy.posts, {
                id: v1(),
                message: action.newPostBody,
                likesCount: 0
            }];
            return partOfStateCopy;
        }
        case ProfileConst.SET_USER_PROFILE: {
            return {...partOfState, profile: action.profile};
        }
        case ProfileConst.SET_STATUS: {
            return {...partOfState, status: action.status};
        }
        case ProfileConst.DELETE_POST: {
            return {...partOfState, posts: partOfState.posts.filter(p => p.id !== action.postId)}
        }
        case ProfileConst.SAVE_PHOTOS_SUCCESS: {
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
        dispatch(profileActions.setUserProfile(data));
    }
}

export const getStatusThunkCreator = (userId: number): ThunkType => {
    return async (dispatch) => {
        const data = await ProfileApi.getStatus(userId);
        dispatch(profileActions.setStatus(data));
    }
}

export const updateStatusThunkCreator = (status: string): ThunkType => {
    return async (dispatch) => {
        const data = await ProfileApi.updateStatus(status);
        if (data.resultCode === ResultCodesEnum.Success) {
            dispatch(profileActions.setStatus(status));
        }
    }
}

export const savePhotoThunkCreator = (file: File): ThunkType => {
    return async (dispatch) => {
        const data = await ProfileApi.savePhoto(file);
        console.log('photodata', data);
        if (data.resultCode === ResultCodesEnum.Success) {
            dispatch(profileActions.savePhoto(data.data.photos));
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