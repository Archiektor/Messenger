import {v1} from "uuid";

const ADD_MESSAGE = "ADD-MESSAGE";
const UPDATE_NEW_MESSAGE_TEXT = "Update-New-Message-Text";

type AddMessageAC = {
    type: typeof ADD_MESSAGE,
};
type UpdatenewMessageTextAC = {
    type: typeof UPDATE_NEW_MESSAGE_TEXT,
    newMsg: string,
};
type DialogsReducerActionType = AddMessageAC | UpdatenewMessageTextAC;

export type MessageType = {
    id: string,
    text: string,
}
export type DialogType = {
    key: string,
    id: number,
    name: string,
}

export type DialogsPage = {
    messages: Array<MessageType>,
    dialogs: Array<DialogType>,
    newMessageText: string,
}

export const AddMessageAC = (): AddMessageAC => ({type: ADD_MESSAGE});
export const UpdatenewMessageTextAC = (message: string): UpdatenewMessageTextAC => ({
    type: UPDATE_NEW_MESSAGE_TEXT,
    newMsg: message
});

let initialState = {
    messages: [
        {id: v1(), text: "Hello"},
        {id: v1(), text: `WTF i'm doing here...`},
        {id: v1(), text: `Alahabara`},
        {id: v1(), text: `For glory`},
        {id: v1(), text: `Soft kitty`},
    ],
    dialogs: [
        {key: v1(), id: 1, name: "Nikki"},
        {key: v1(), id: 2, name: "Dima"},
        {key: v1(), id: 3, name: "Ania"},
        {key: v1(), id: 4, name: "Tanya"},
        {key: v1(), id: 5, name: "Timur"},
        {key: v1(), id: 6, name: "Roxenne"},
    ],
    newMessageText: "",
}

const dialogsReducer = (partOfState: DialogsPage = initialState, action: DialogsReducerActionType): DialogsPage => {
    let partOfStateCopy: DialogsPage;
    switch (action.type) {
        case ADD_MESSAGE: {
            partOfStateCopy = {...partOfState, messages: [...partOfState.messages],};
            partOfStateCopy.messages = [...partOfStateCopy.messages, {id: v1(), text: partOfStateCopy.newMessageText,}];
            partOfStateCopy.newMessageText = "";
            return partOfStateCopy;
        }
        case UPDATE_NEW_MESSAGE_TEXT: {
            partOfStateCopy = {...partOfState,}
            if (action.newMsg) {
                partOfStateCopy.newMessageText = action.newMsg;
            }
            return partOfStateCopy;
        }
        default:
            return partOfState;
    }
}

export default dialogsReducer;
