import {ThunkAction} from 'redux-thunk';
import {AppStateType} from './redux-store';
import {AuthAPI, securityApi} from '../components/api/api';
import {stopSubmit} from 'redux-form';

const SET_USER_DATA = 'network/auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'network/auth/GET_CAPTCHA_URL_SUCCESS';

type setUserDataACType = {
    type: typeof SET_USER_DATA,
    payload: SetAuthUserDataPayloadType,
}

type setCaptchaUrlACType = { type: typeof GET_CAPTCHA_URL_SUCCESS, captchaUrl: string }

type AuthReducerActionType = setUserDataACType | setCaptchaUrlACType;

type SetAuthUserDataPayloadType = {
    userId: number | null
    email: string | null,
    login: string | null,
    isAuth: boolean,
}

export const setAuthUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean): setUserDataACType => ({
    type: SET_USER_DATA,
    payload: {
        userId: id,
        email,
        login,
        isAuth,
    }
})

export const setCaptchaUrl = (captcha: string): setCaptchaUrlACType => ({
    type: GET_CAPTCHA_URL_SUCCESS,
    captchaUrl: captcha
})

export type UserDataType = {
    id: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean,
    captchaUrl: string | null,
}

let initialState: UserDataType = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null,
}

const authReducer = (partOfState = initialState, action: AuthReducerActionType): UserDataType => {
    switch (action.type) {
        case SET_USER_DATA: {
            const {userId, email, login, isAuth} = action.payload;
            return {...partOfState, id: userId, email: email, login: login, isAuth: isAuth}
        }
        case GET_CAPTCHA_URL_SUCCESS: {
            return {...partOfState, captchaUrl: action.captchaUrl}
        }
        default:
            return partOfState;
    }
}

//TODO change type from any
type ThunkType = ThunkAction<Promise<any>, AppStateType, unknown, AuthReducerActionType>

export const AuthMeThunkCreator = (): ThunkType => {
    return async (dispatch) => {
        let data = await AuthAPI.authMe()
        if (data.resultCode === 0) {
            const {id, email, login} = data.data;
            dispatch(setAuthUserData(id, email, login, true));
        }
        return data;
    }
}

export const LoginMeThunkCreator = (login: string, password: string, rememberMe?: boolean, captcha?: boolean): ThunkType => {
    return async (dispatch) => {
        let data = await AuthAPI.loginMe(login, password, rememberMe, captcha)
        if (data.resultCode === 0) {
            await dispatch(AuthMeThunkCreator());
            alert('Successfully logined');
        } else {
            if (data.resultCode === 10) {
                await dispatch(getCaptchaUrl());
            }
            let errMsg = data.messages.length > 0 ? data.messages[0] : 'Unknown error';
            //TODO change type from ignore
            // @ts-ignore
            dispatch(stopSubmit('login', {_error: errMsg}))
        }
    }
}

export const LoginOutThunkCreator = (): ThunkType => {
    return async (dispatch) => {
        let data = await AuthAPI.logoutMe()
        if (data.resultCode === 0) {
            alert('Succesfully logout');
            dispatch(setAuthUserData(null, null, null, false))
        }
    }
}

export const getCaptchaUrl = (): ThunkType => {
    return async (dispatch) => {
        const {url} = await securityApi.getCaptchaUrl();
        if (url) {
            dispatch(setCaptchaUrl(url))
        }
    }
}

export default authReducer;