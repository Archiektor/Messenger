import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";
import {AuthAPI} from "../components/api/api";
import {FormAction, stopSubmit} from "redux-form";

const SET_USER_DATA = "network/auth/SET_USER_DATA";

type setUserDataACType = {
    type: typeof SET_USER_DATA,
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean,
}

type AuthReducerActionType = setUserDataACType | FormAction;

export type UserDataType = {
    id: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean,
}

export const setAuthUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean): setUserDataACType => ({
    type: SET_USER_DATA,
    userId: id,
    email,
    login,
    isAuth,
})

let initialState: UserDataType = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
}
// bug
const authReducer = (partOfState: UserDataType = initialState, action: setUserDataACType): UserDataType => {
    switch (action.type) {
        case SET_USER_DATA: {
            return {...partOfState, id: action.userId, email: action.email, login: action.login, isAuth: action.isAuth}
        }
        default:
            return partOfState;
    }
}

// ! types any
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
            alert("Succesfully logined");
        } else {
            let errMsg = data.messages.length > 0 ? data.messages[0] : "Unknown error";
            dispatch(stopSubmit("login", {_error: errMsg}))
        }
    }
}

export const LoginOutThunkCreator = (): ThunkType => {
    return async (dispatch) => {
        let data = await AuthAPI.logoutMe()
        if (data.resultCode === 0) {
            alert("Succesfully logout");
            dispatch(setAuthUserData(null, null, null, false))
        }
    }
}

export default authReducer;