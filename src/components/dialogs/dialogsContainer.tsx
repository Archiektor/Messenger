import React from "react";
import {AddMessageActionCreator, UpdatenewMessageTextActionCreator} from "../../redux/dialogs-reducer";
import Dialogs from "./dialogs";
import {Store} from "redux";

type PropsType = {
    store: Store,
}

const DialogsContainer: React.FC<PropsType> = (props) => {
    const {dispatch, getState} = props.store;
    const state = getState();
    const data = {
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages,
        newMessageText: state.dialogsPage.newMessageText,
    }

    const addMessage = () => {
        dispatch(AddMessageActionCreator())
    }

    const updateNewMessageText = (message: string) => {
        dispatch(UpdatenewMessageTextActionCreator(message))
    }

    return (
        <Dialogs data={data} addMessage={addMessage} updateNewMessageText={updateNewMessageText}/>
    )
}

export default DialogsContainer;