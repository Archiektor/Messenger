import React from "react";

import s from "./header.module.css";
import logo from "../icons/whatsapp.png"
import {NavLink} from "react-router-dom";

type HeaderType = {
    login: string | null,
    isAuth: boolean,
    LoginOutThunkCreator: () => void,
}

const Header: React.FC<HeaderType> = (props) => {
    return (
        <header className={s.header}>
            <img src={logo} alt="study logo"/>
            <h2>{"Let's talk"}</h2>
            <div className={s.loginBlock}>
                {props.isAuth ?
                    <div>{props.login} - <button onClick={props.LoginOutThunkCreator}>Log out</button></div>
                    : <NavLink to={'/login'}>Login</NavLink>}
            </div>
        </header>
    )
}

export default Header;