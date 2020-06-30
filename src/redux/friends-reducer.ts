import {ActionType} from "./store";
import {FriendsPage} from "../App";
import {v1} from "uuid";

let initialState = {
    friends: [
        {id: v1(), name: "Nikki", age: 28, picture: "#"},
        {id: v1(), name: "Anna", age: 34, picture: "#"},
        {id: v1(), name: "Sveta", age: 15, picture: "#"},
        {id: v1(), name: "Marco", age: 28, picture: "#"},
        {id: v1(), name: "Greg", age: 34, picture: "#"},
        {id: v1(), name: "Agnes", age: 15, picture: "#"}],
}

const friendsReducer = (partOfState: FriendsPage = initialState, action: ActionType): FriendsPage => {
    return partOfState;
}

export default friendsReducer;