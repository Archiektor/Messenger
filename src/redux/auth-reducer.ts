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
            return {...partOfState, ...action.data, isAuth : true}
        }
        default:
            return partOfState;
    }
}

export default authReducer;