import React from "react";

import Post from "./post";

import css from "./profile.module.css";
import Myposts from "./myposts";

const Profile = () => {
    return (
        <div>
            <div>
                <img className={css.bgImg}
                     src="https://cdn57.androidauthority.net/wp-content/uploads/2015/11/00-best-backgrounds-and-wallpaper-apps-for-android.jpg"
                     alt="attract photo"/>
            </div>
            <div className={css.mainInfo}>
                <img className={css.profImg} src="https://cs11.pikabu.ru/post_img/2020/05/06/11/158879081415286768.jpg"
                     alt=""/>
                <div> ava + description
                </div>
            </div>
            <Myposts/>
        </div>
    )
}

export default Profile;