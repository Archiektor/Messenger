import React, {ChangeEvent} from "react";

import css from "./dialogs.module.css";
import DialogItem from "./dialogitem/dialogitem";
import Message from "./message/message";
import {
    ActionType,
    DialogType,
    MessageType,
} from "../../redux/store";
import {AddMessageActionCreator, UpdatenewMessageTextActionCreator} from "../../redux/dialogs-reducer";

type PropsType = {
    data: {
        dialogs: Array<DialogType>,
        messages: Array<MessageType>,
        newMessageText: string,
    },
    dispatch: (action: ActionType) => void,
}

const Dialogs: React.FC<PropsType> = ({data, dispatch}) => {

    let dialogsElements = data.dialogs.map((dialog) => {
        const {key, name, id} = dialog;
        return (<DialogItem name={name} id={id} key={key}/>)
    })

    let messageElements = data.messages.map((message) => {
        const {text, id: key} = message;
        return (
            <Message text={text} key={key}/>
        )
    })


    const addMessageHandler = () => {
        // addMessage();
        dispatch(AddMessageActionCreator())
    }

    const modifyMessageHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let message = e.currentTarget.value;
        // updateNewMessageText(message);
        dispatch(UpdatenewMessageTextActionCreator(message))
    }

    return (
        <div className={css.dialogs}>
            <div className={css.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={css.messages}>
                {messageElements}
                <div className={css.addMsg}>
                    <textarea placeholder={`Enter your message`} value={data.newMessageText} onChange={modifyMessageHandler}/>
                    <button onClick={addMessageHandler}>add message</button>
                </div>
            </div>
        </div>
    )
}

export default Dialogs;