import React from "react";

import css from "./profileinfo.module.css";

const ProfileInfo = () => {
    return (
        <div className={css.wrapper}>
            <div className={css.border}>
                <img className={css.bgImg}
                     src="https://cdn57.androidauthority.net/wp-content/uploads/2015/11/00-best-backgrounds-and-wallpaper-apps-for-android.jpg"
                     alt={"attractda"}/>
            </div>
            <div className={css.mainInfo}>
                <img className={css.profImg} src="https://cs11.pikabu.ru/post_img/2020/05/06/11/158879081415286768.jpg"
                     alt={""}/>
                <div className={css.userInfo}>
                    <h2>{`Nikki Odintsov`}</h2>
                    <p>{`junior front-end developer`}</p>
                    <p>{`...think about universe`}</p>
                </div>
            </div>
        </div>
    )
}

export default ProfileInfo;