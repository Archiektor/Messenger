import {AppStateType} from "./redux-store";
import {createSelector} from "reselect";

export const getUsers = (state: AppStateType) => {
    return state.usersPage.users;
}

export const getPageSize = (state: AppStateType) => {
    return state.usersPage.pageSize;
}

export const getTotalUsersCount = (state: AppStateType) => {
    return state.usersPage.totalUsersCount;
}

export const getCurrentPage = (state: AppStateType) => {
    return state.usersPage.currentPage;
}

export const getIsFetching = (state: AppStateType) => {
    return state.usersPage.isFetching;
}

export const getIsLoading = (state: AppStateType) => {
    return state.usersPage.isLoading;
}
export const getDisabledUsers = (state: AppStateType) => {
    return state.usersPage.disabledUsers;
}
// selectors
export const getUsersSelector = createSelector(getUsers, getIsFetching,(users, isFetching) => {
    return users.filter(u => true)
})


