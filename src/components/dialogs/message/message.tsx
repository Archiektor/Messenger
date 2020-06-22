import React from "react";

import css from "../dialogs.module.css";

type MessageType = {
    text: string,
}

const Message: React.FC<MessageType> = (props) => {
    const {text} = props;
    return (
        <div className={css.msgWrapper}>
            <div className={css.round}></div>
            <div className={css.message}>{text}</div>
        </div>
    )
}

export default Message;