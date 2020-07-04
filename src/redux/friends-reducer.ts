import {v1} from "uuid";

export type FriendType = {
    id: string,
    name: string,
    age?: number,
    picture: string,
}

export type FriendsPage = {
    friends: Array<FriendType>
}

type FriendsReducerActionType = any;

let initialState = {
    friends: [
        {id: v1(), name: "Nikki", age: 28, picture: "#"},
        {id: v1(), name: "Anna", age: 34, picture: "#"},
        {id: v1(), name: "Sveta", age: 15, picture: "#"},
        {id: v1(), name: "Marco", age: 28, picture: "#"},
        {id: v1(), name: "Greg", age: 34, picture: "#"},
        {id: v1(), name: "Agnes", age: 15, picture: "#"}],
}

const friendsReducer = (partOfState: FriendsPage = initialState, action: FriendsReducerActionType): FriendsPage => {
    return partOfState;
}

export default friendsReducer;