import {v1} from "uuid";
import {rerenderEntireTree} from "../render";

export type DialogType = {
    key: string,
    id: number,
    name: string,
}

let dialogs: Array<DialogType> = [
    {key: v1(), id: 1, name: "Nikki"},
    {key: v1(), id: 2, name: "Dima"},
    {key: v1(), id: 3, name: "Ania"},
    {key: v1(), id: 4, name: "Tanya"},
    {key: v1(), id: 5, name: "Timur"},
    {key: v1(), id: 6, name: "Roxenne"},
];

export type MessageType = {
    id: string,
    text: string,
}

let messages: Array<MessageType> = [
    {id: v1(), text: "Hello"},
    {id: v1(), text: `WTF i'm doing here...`},
    {id: v1(), text: `Alahabara`},
    {id: v1(), text: `For courage`},
    {id: v1(), text: `Soft kitty`},
];

export type PostType = {
    id: string,
    message: string,
    likesCount: number
}

let posts: Array<PostType> = [
    {id: v1(), message: `Hi, how are you ?`, likesCount: 12},
    {id: v1(), message: `Ccom man, wtf ?`, likesCount: 5},
    {id: v1(), message: `I'm a little pussy`, likesCount: 4},
    {id: v1(), message: `post#4`, likesCount: 13},
    {id: v1(), message: `post#5`, likesCount: 0},
];

export type FriendType = {
    id: string,
    name: string,
    age?: number,
    picture: string,
}

let friends = [{id: v1(), name: "Nikki", age: 28, picture: "#"},
    {id: v1(), name: "Anna", age: 34, picture: "#"},
    {id: v1(), name: "Sveta", age: 15, picture: "#"},
    {id: v1(), name: "Marco", age: 28, picture: "#"},
    {id: v1(), name: "Greg", age: 34, picture: "#"},
    {id: v1(), name: "Agnes", age: 15, picture: "#"}];

export const addPost = () => {
    posts = [...posts, {id: v1(), message: state.profilePage.newPostText, likesCount: 0}];
    state.profilePage.posts = posts;
    state.profilePage.newPostText = "";
    rerenderEntireTree(state);
}

export const updateNewPostText = (newText: string) => {
    state.profilePage.newPostText = newText;
    rerenderEntireTree(state);
}

export const addMessage = () => {
    messages = [...messages, {id: v1(), text: state.messagesPage.newMessageText}]
    state.messagesPage.messages = messages;
    state.messagesPage.newMessageText = "";
    rerenderEntireTree(state)
}

export const updateNewMessageText = (newMsg: string) => {
    state.messagesPage.newMessageText = newMsg;
    rerenderEntireTree(state);
}

export const state = {
    profilePage: {
        posts,
        newPostText: "",
    },
    messagesPage: {
        messages,
        dialogs,
        newMessageText: "",
    },
    friendsPage: {
        friends,
    }
};






