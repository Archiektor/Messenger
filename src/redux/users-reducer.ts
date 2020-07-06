const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";

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
type UsersReducerActionType = FollowACType | UnFollowACType | SetUsersACType;
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
}

export const followAC = (userId: string): FollowACType => ({type: FOLLOW, userId: userId});
export const unfollowAC = (userId: string): UnFollowACType => ({type: UNFOLLOW, userId: userId});
export const setUsersAC = (users: Array<UserType>): SetUsersACType => ({type: SET_USERS, users: users});

let initialState = {

    users: [],
    /*
        users: [
            {
                id: v1(),
                photos: "",
                followed: false,
                name: "Nikki Odd",
                location: {country: "Poland", city: "Szczecin"},
                status: "I'm looking for job now..."
            },
            {
                id: v1(),
                photos: "",
                followed: false,
                name: "Anna Po-po",
                location: {country: "Poland", city: "Warsaw"},
                status: "I'm so pretty"
            },
            {
                id: v1(),
                photos: "",
                followed: true,
                name: "Dima Ho",
                location: {country: "Belarus", city: "Minsk"},
                status: "When this learning ends ?"
            },
            {
                id: v1(),
                photos: "",
                followed: true,
                name: "Ala Pu",
                location: {country: "United States", city: "Chicago"},
                status: "Make some party !"
            },
        ],
    */
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
            return {...partOfState, users: [...partOfState.users, ...action.users!]}
        }
        default:
            return partOfState;
    }
}

export default usersReducer;