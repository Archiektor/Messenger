import {v1} from "uuid";
import {ActionType} from "./store";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";

export const followAC = (userId: string): ActionType => ({type: FOLLOW, userId: userId});
export const unfollowAC = (userId: string): ActionType => ({type: UNFOLLOW, userId: userId});
export const setUsersAC = (users : Array<UserType>): ActionType => ({type: SET_USERS, users: users});


export type UserType = {
    id: string,
    photoUrl: string,
    followed: boolean,
    fullName: string,
    status: string,
    location: {
        country: string,
        city: string
    }
}

export type UsersPage = {
    users: Array<UserType>,
}

let initialState = {

    users: [],
/*
    users: [
        {
            id: v1(),
            photoUrl: "",
            followed: false,
            fullName: "Nikki Odd",
            location: {country: "Poland", city: "Szczecin"},
            status: "I'm looking for job now..."
        },
        {
            id: v1(),
            photoUrl: "",
            followed: false,
            fullName: "Anna Po-po",
            location: {country: "Poland", city: "Warsaw"},
            status: "I'm so pretty"
        },
        {
            id: v1(),
            photoUrl: "",
            followed: true,
            fullName: "Dima Ho",
            location: {country: "Belarus", city: "Minsk"},
            status: "When this learning ends ?"
        },
        {
            id: v1(),
            photoUrl: "",
            followed: true,
            fullName: "Ala Pu",
            location: {country: "United States", city: "Chicago"},
            status: "Make some party !"
        },
    ],
*/
}

const usersReducer = (partOfState: UsersPage = initialState, action: ActionType): UsersPage => {
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
            return {...partOfState, users: [...partOfState.users, ...action.users!]}
        }
        default:
            return partOfState;
    }
}

export default usersReducer;