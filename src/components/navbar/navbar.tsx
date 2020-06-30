import React from "react";

import cssClasses from "./navbar.module.css";
import {NavLink} from "react-router-dom";
import Friends from "../friends";
import {FriendType} from "../../redux/store";

export type NavbarType = {
    data: DataType
}

export type DataType = {
    friends: Array<FriendType>
}

const Navbar: React.FC<NavbarType> = ({data}) => {
    return (

        <nav className={cssClasses.nav}>
            <div className={cssClasses.item}><NavLink activeClassName={cssClasses.activeLink}
                                                      to="/profile">Profile</NavLink></div>
            <div className={cssClasses.item}><NavLink activeClassName={cssClasses.activeLink}
                                                      to="/dialogs">Messages</NavLink></div>
            <div className={cssClasses.item}><NavLink activeClassName={cssClasses.activeLink}
                                                      to="/news">News</NavLink>
            </div>
            <div className={cssClasses.item}><NavLink activeClassName={cssClasses.activeLink}
                                                      to="/music">Music</NavLink></div>
            <div className={cssClasses.item}><NavLink activeClassName={cssClasses.activeLink}
                                                      to="/settings">Settings</NavLink></div>
            <div className={cssClasses.item}><NavLink activeClassName={cssClasses.activeLink}
                                                      to="/friends">Friends</NavLink></div>
            <Friends data={data}/>

        </nav>

    )
}

export default Navbar;