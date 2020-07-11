import {UserApi} from "../components/api/api";
import {Action, Dispatch} from "redux";
import {AppStateType} from "./redux-store";
import {ThunkAction} from "redux-thunk";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SWITCH_IS_FETCHING = "SWITCH_IS_FETCHING";
const SWITCH_IS_LOADING = "SWITCH_IS_LOADING";

type FollowACType = {
    type: typeof FOLLOW,
    userId: string,
};
type UnFollowACType = {
    type: typeof UNFOLLOW,
    userId: string,
};
type SetUsersACType = {
    type: typeof SET_USERS,
    users: Array<UserType>,
};
type SetTotalUsersCountACType = {
    type: typeof SET_TOTAL_USERS_COUNT,
    totalUsersCount: number,
};
type SetCurrentPageACType = {
    type: typeof SET_CURRENT_PAGE,
    currentPage: number,
}
type SwitchIsFetchingACType = {
    type: typeof SWITCH_IS_FETCHING,
    isFetching: boolean,
}
type SwitchIsLoadingACType = {
    type: typeof SWITCH_IS_LOADING,
    isLoading: boolean,
    userId: string,
}

type UsersReducerActionsType = FollowACType | UnFollowACType | SetUsersACType | SetTotalUsersCountACType |
    SetCurrentPageACType | SwitchIsFetchingACType | SwitchIsLoadingACType;

export type UserType = {
    id: string,
    photos: {
        small: string,
        large: string
    },
    followed: boolean,
    name: string,
    status: string,
    location: {
        country: string,
        city: string
    }
}

export type UsersPage = {
    users: Array<UserType>,
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    isFetching: boolean,
    isLoading: boolean,
    disabledUsers: Array<string>,
}

// Action Creator's
export const followSuccess = (userId: string): FollowACType => ({type: FOLLOW, userId: userId});
export const unfollowSuccess = (userId: string): UnFollowACType => ({type: UNFOLLOW, userId: userId});
export const setUsers = (users: Array<UserType>): SetUsersACType => ({type: SET_USERS, users: users});
export const setTotalUsersCount = (totalUsersCount: number): SetTotalUsersCountACType => ({
    type: SET_TOTAL_USERS_COUNT,
    totalUsersCount: totalUsersCount
});
export const setCurrentPage = (currentPage: number): SetCurrentPageACType => ({type: SET_CURRENT_PAGE, currentPage});
export const switchIsFetching = (isFetching: boolean): SwitchIsFetchingACType => ({
    type: SWITCH_IS_FETCHING,
    isFetching
});
export const switchIsLoading = (isLoading: boolean, userId: string): SwitchIsLoadingACType => ({
    type: SWITCH_IS_LOADING,
    isLoading,
    userId
});

let initialState: UsersPage = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    isLoading: false,
    disabledUsers: [],
}

const usersReducer = (partOfState: UsersPage = initialState, action: UsersReducerActionsType): UsersPage => {
    switch (action.type) {
        case FOLLOW: {
            let partOfStateCopy = {
                ...partOfState,
                users: partOfState.users.map(user => {
                    if (user.id === action.userId) {
                        return {...user, followed: true}
                    }
                    return user;
                })
            };
            return partOfStateCopy;
        }
        case UNFOLLOW: {
            let partOfStateCopy = {
                ...partOfState,
                users: partOfState.users.map(user => {
                    if (user.id === action.userId) {
                        return {...user, followed: false}
                    }
                    return user;
                })
            };
            return partOfStateCopy;
        }
        case SET_USERS: {
            return {...partOfState, users: action.users!}
        }
        case SET_TOTAL_USERS_COUNT: {
            // debugger;
            return {...partOfState, totalUsersCount: action.totalUsersCount}
        }
        case SET_CURRENT_PAGE: {
            // debugger;
            return {...partOfState, currentPage: action.currentPage}
        }
        case SWITCH_IS_FETCHING: {
            // debugger;
            return {...partOfState, isFetching: action.isFetching}
        }
        case SWITCH_IS_LOADING: {
            // debugger;
            return {
                ...partOfState,
                disabledUsers: action.isLoading ?
                    [...partOfState.disabledUsers, action.userId] :
                    partOfState.disabledUsers.filter(id => id !== action.userId)
            }
        }

        default:
            return partOfState;
    }
}

// type GetStateType = () => AppStateType;
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, UsersReducerActionsType>;

export const getUsersThunkCreator = (currentPage: number, pageSize: number): ThunkType => {
    return async (dispatch) => { // getUsersThunk
        dispatch(switchIsFetching(true));
        let data = await UserApi.getUsers(currentPage, pageSize);
        // debugger;
        dispatch(switchIsFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount))
    }
}

export const unfollowUserThunkCreator = (userId: string): ThunkType => {
    // debugger;
    return async (dispatch) => {
        dispatch(switchIsLoading(true, userId));
        let data = await UserApi.unfollowUser(userId)
        // debugger;
        dispatch(switchIsLoading(false, userId));
        if (data.resultCode === 0) {
            dispatch(unfollowSuccess(userId));
        }
    }
}

export const followUserThunkCreator = (userId: string): ThunkType => {
    // debugger;
    return async (dispatch) => { // getFollowUserThunk
        dispatch(switchIsLoading(true, userId));
        debugger;
        let data = await UserApi.followUser(userId);
        dispatch(switchIsLoading(false, userId));
        if (data.resultCode === 0) {
            dispatch(followSuccess(userId));
        }
    }
}

export default usersReducer;