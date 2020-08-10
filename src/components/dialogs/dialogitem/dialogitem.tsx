import React from "react";

import {NavLink} from "react-router-dom";

import css from "../dialogs.module.css";

type DialogItemType = {
    key: string,
    name: string,
    id: number,
}

const DialogItem: React.FC<DialogItemType> = React.memo((props) => {
    const {name, id} = props;
    return (
        <div className={css.dialogs}>
            <div className={css.ava}></div>
            <NavLink className={css.link} to={`/dialogs/${id}`}>{name}</NavLink>
        </div>
    )
})

export default DialogItem;