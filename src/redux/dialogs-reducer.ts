import {ActionType} from "./store";
import {v1} from "uuid";
import {DialogsPage} from "../App";

const ADD_MESSAGE = "ADD-MESSAGE";
const UPDATE_NEW_MESSAGE_TEXT = "Update-New-Message-Text";


export const AddMessageActionCreator = (): ActionType => ({type: ADD_MESSAGE});
export const UpdatenewMessageTextActionCreator = (message: string): ActionType => ({
    type: UPDATE_NEW_MESSAGE_TEXT,
    newMsg: message
});

const dialogsReducer = (partOfState: DialogsPage, action: ActionType): DialogsPage => {
    switch (action.type) {
        case ADD_MESSAGE:
            let modMessages;
            modMessages = [...partOfState.messages, {
                id: v1(),
                text: partOfState.newMessageText,
            }]
            partOfState.messages = modMessages;
            partOfState.newMessageText = "";
            // this._callSubsriber(this._state);
            return partOfState;
        case UPDATE_NEW_MESSAGE_TEXT:
            if (action.newMsg != null) {
                partOfState.newMessageText = action.newMsg;
            }
            // this._callSubsriber(this._state);
            return partOfState;
        default:
            return partOfState;
    }
}

export default dialogsReducer;
