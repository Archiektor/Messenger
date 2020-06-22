import React from "react";

import css from "./post.module.css";
import like from "../../icons/heart.png";

type RootType = {
    message: string,
    likesCount: number
}

const Post: React.FC<RootType> = (props) => {
    return (
        <div className={`${css.item} ${css.active}`}>
            <img className={css.avatar}
                 src="https://img1.ak.crunchyroll.com/i/spire3/3614810e9ada5235038e8deb4adc264c1447729591_large.jpg"
                 alt="avator of user"/>
            <p>{props.message}</p>
            <div>
                <span>{props.likesCount}</span>
                <img src={like} className={css.like} alt={`like logo`}>{}</img>
            </div>
        </div>
    )
}

export default Post;