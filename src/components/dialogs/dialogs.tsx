import React, {ChangeEvent} from "react";

import css from "./dialogs.module.css";
import DialogItem from "./dialogitem/dialogitem";
import Message from "./message/message";
import {DialogsPage} from "../../redux/dialogs-reducer";

type PropsType = {
    dialogsPage: DialogsPage,
    addMessage: () => void,
    updateNewMessageText: (str: string) => void,
    isAuth: boolean,
}
const Dialogs: React.FC<PropsType> = ({dialogsPage, addMessage, updateNewMessageText, isAuth}) => {
    // debugger;


    let dialogsElements = dialogsPage.dialogs.map((dialog) => {
        const {key, name, id} = dialog;
        return (<DialogItem name={name} id={id} key={key}/>)
    })

    let messageElements = dialogsPage.messages.map((message) => {
        const {text, id: key} = message;
        return (
            <Message text={text} key={key}/>
        )
    })

    const addMessageHandler = () => {
        addMessage();
    }

    const modifyMessageHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let message = e.currentTarget.value;
        // debugger;
        updateNewMessageText(message);
    }

    return (
        <div className={css.dialogs}>
            <div className={css.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={css.messages}>
                {messageElements}
                <div className={css.addMsg}>
                    <textarea placeholder={`Enter your message`} value={dialogsPage.newMessageText}
                              onChange={modifyMessageHandler}/>
                    <button onClick={addMessageHandler}>add message</button>
                </div>
            </div>
        </div>
    )
}

export default Dialogs;

