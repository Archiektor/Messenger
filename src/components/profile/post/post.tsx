import React from "react";

import css from "./post.module.css";

const Post = () => {
    return (
        <div className={`${css.item} ${css.active}`}>
            <img className={css.avatar}
                 src="https://img1.ak.crunchyroll.com/i/spire3/3614810e9ada5235038e8deb4adc264c1447729591_large.jpg"
                 alt="avator of user"/>
            post1
        </div>
    )
}

export default Post;