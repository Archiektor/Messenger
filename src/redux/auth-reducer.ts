import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";
import {AuthAPI} from "../components/api/api";

const SET_USER_DATA = "SET_USER_DATA";

type setUserDataACType = {
    type: typeof SET_USER_DATA,
    data: UserDataType,
}

type AuthReducerActionType = setUserDataACType;

export type UserDataType = {
    id: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean,
}

export const setAuthUserData = (data: UserDataType): setUserDataACType => ({
    type: SET_USER_DATA,
    data,
})

let initialState: UserDataType = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
}

const authReducer = (partOfState: UserDataType = initialState, action: AuthReducerActionType): UserDataType => {
    switch (action.type) {
        case SET_USER_DATA: {
            return {...partOfState, ...action.data, isAuth: true}
        }
        default:
            return partOfState;
    }
}

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, AuthReducerActionType>

export const AuthMeThunkCreator = (): ThunkType => {
    return async (dispatch) => {
        let data = await AuthAPI.authMe()
        if (data.resultCode === 0) {
            dispatch(setAuthUserData(data.data));
        }
    }
}

export default authReducer;