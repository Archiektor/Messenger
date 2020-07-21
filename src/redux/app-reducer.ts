import {AuthMeThunkCreator} from "./auth-reducer";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";

const INITIALIZED_SUCCESS = "network/app/INITIALIZED_SUCCESS";

type InitializedSuccessACType = {
    type: typeof INITIALIZED_SUCCESS,
}

type AppActionsType = InitializedSuccessACType;

export const initializedSuccess = (): InitializedSuccessACType => ({type: INITIALIZED_SUCCESS})

type PartOfStateType = {
    initialized: boolean
}

let initialState: PartOfStateType = {
    initialized: false
}

const appReducer = (partOfState: PartOfStateType = initialState, action: AppActionsType): PartOfStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS: {
            return {...partOfState, initialized: true}
        }
        default:
            return partOfState;
    }
}

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, AppActionsType>

export const initializeAppThunkCreator = (): ThunkType => {
    return async (dispatch) => {
        await dispatch(AuthMeThunkCreator());
        // debugger;
        await dispatch(initializedSuccess());
    }
}

export default appReducer;
