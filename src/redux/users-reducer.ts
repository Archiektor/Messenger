import {CommonResponseType, ResultCodesEnum} from '../components/api/api';
import {AppStateType, InferActionsType} from './redux-store';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {updateObjectInArray} from '../components/utils/objects-helper';
import {UserApi} from '../components/api/users-api';

type UsersReducerActionsType = InferActionsType<typeof actions>;

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

// Action Creator's
export const actions = {
    followSuccess: (userId: string) => ({type: `FOLLOW`, userId: userId} as const),
    unfollowSuccess: (userId: string) => ({type: `UNFOLLOW`, userId: userId} as const),
    setUsers: (users: Array<UserType>) => ({type: `SET_USERS`, users: users} as const),
    setTotalUsersCount: (totalUsersCount: number) => ({
        type: `SET_TOTAL_USERS_COUNT`,
        totalUsersCount: totalUsersCount
    } as const),
    setCurrentPage: (currentPage: number) => ({type: `SET_CURRENT_PAGE`, currentPage} as const),
    switchIsFetching: (isFetching: boolean) => ({
        type: `SWITCH_IS_FETCHING`,
        isFetching
    } as const),
    switchIsLoading: (isLoading: boolean, userId: string) => ({
        type: `SWITCH_IS_LOADING`,
        isLoading,
        userId
    } as const),
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

let initialState: UsersPage = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    isLoading: false,
    disabledUsers: [],
}

const usersReducer = (partOfState = initialState, action: UsersReducerActionsType): UsersPage => {
    switch (action.type) {
        case `FOLLOW`: {
            return {
                ...partOfState,
                users: updateObjectInArray(partOfState.users, action.userId, 'id', {followed: true})
            };
        }
        case `UNFOLLOW`: {
            return {
                ...partOfState,
                users: updateObjectInArray(partOfState.users, action.userId, 'id', {followed: false})
            };
        }
        case `SET_USERS`: {
            return {...partOfState, users: action.users!}
        }
        case `SET_TOTAL_USERS_COUNT`: {
            return {...partOfState, totalUsersCount: action.totalUsersCount}
        }
        case `SET_CURRENT_PAGE`: {
            return {...partOfState, currentPage: action.currentPage}
        }
        case `SWITCH_IS_FETCHING`: {
            return {...partOfState, isFetching: action.isFetching}
        }
        case `SWITCH_IS_LOADING`: {
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

export const getUsersThunkCreator = (page: number, pageSize: number): ThunkType => {
    return async (dispatch) => { // getUsersThunk
        dispatch(actions.switchIsFetching(true));
        let data = await UserApi.getUsers(page, pageSize);
        dispatch(actions.switchIsFetching(false));
        dispatch(actions.setUsers(data.items));
        dispatch(actions.setTotalUsersCount(data.totalCount))
    }
}


const _followUnfollowFlow = async (dispatch: ThunkDispatch<AppStateType, unknown, UsersReducerActionsType>,
                                   userId: string,
                                   fn: (userId: string) => Promise<CommonResponseType>, flowSuccess: (userId: string) => UsersReducerActionsType) => {
    dispatch(actions.switchIsLoading(true, userId));
    let data = await fn(userId)
    dispatch(actions.switchIsLoading(false, userId));
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(flowSuccess(userId));
    }
}

export const unfollowUserThunkCreator = (userId: string): ThunkType => {
    return async (dispatch) => {
        await _followUnfollowFlow(dispatch, userId, UserApi.unfollowUser, actions.unfollowSuccess)
        /*        dispatch(switchIsLoading(true, userId));
                let data = await UserApi.unfollowUser(userId)
                dispatch(switchIsLoading(false, userId));
                if (data.resultCode === 0) {
                    dispatch(unfollowSuccess(userId));
                }*/
    }
}

export const followUserThunkCreator = (userId: string): ThunkType => {
    return async (dispatch) => { // getFollowUserThunk
        await _followUnfollowFlow(dispatch, userId, UserApi.followUser, actions.followSuccess)
        /*        dispatch(switchIsLoading(true, userId));
                let data = await UserApi.followUser(userId);
                dispatch(switchIsLoading(false, userId));
                if (data.resultCode === 0) {
                    dispatch(followSuccess(userId));
                }*/
    }
}

export default usersReducer;