const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SWITCH_IS_FETCHING = "SWITCH_IS_FETCHING";

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

type UsersReducerActionType = FollowACType | UnFollowACType | SetUsersACType | SetTotalUsersCountACType | SetCurrentPageACType | SwitchIsFetchingACType;

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
}

// Action Creator's
export const follow = (userId: string): FollowACType => ({type: FOLLOW, userId: userId});
export const unfollow = (userId: string): UnFollowACType => ({type: UNFOLLOW, userId: userId});
export const setUsers = (users: Array<UserType>): SetUsersACType => ({type: SET_USERS, users: users});
export const setTotalUsersCount = (totalUsersCount: number): SetTotalUsersCountACType => ({
    type: SET_TOTAL_USERS_COUNT,
    totalUsersCount: totalUsersCount
});
export const setCurrentPage = (currentPage: number) : SetCurrentPageACType => ({type: SET_CURRENT_PAGE, currentPage: currentPage});
export const switchIsFetching = (isFetch: boolean) : SwitchIsFetchingACType => ({type: SWITCH_IS_FETCHING, isFetching: isFetch});

let initialState: UsersPage = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
}

const usersReducer = (partOfState: UsersPage = initialState, action: UsersReducerActionType): UsersPage => {
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

        default:
            return partOfState;
    }
}

export default usersReducer;