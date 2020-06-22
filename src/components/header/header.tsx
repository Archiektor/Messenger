import React from "react";

import css from "./header.module.css";
import logo from "../icons/whatsapp.png"

const Header = () => {
    return (
        <header className={css.header}>
            <img src={logo} alt="study logo"/>
            <h2>{"Let's talk"}</h2>
        </header>
    )
}

export default Header;