import React from "react";

import css from "./friends.module.css";
import {FriendType} from "../../redux/state";
import {NavbarType} from "../navbar/navbar";
import avatar from "../icons/person.png";

const renderFriends = (arr: Array<FriendType>) => {
    return arr.map(friend => {
                return (
                    <div key={friend.id} className={css.oneFriendWrapper}>
                        <div className={css.oneFriendPicture}></div>
                        <div className={css.oneFriendName}>{friend.name}</div>
                    </div>
                )
    })
}

const Friends: React.FC<NavbarType> = (props: any) => {
    return (
        <div className={css.friendsWrapper}>
            {renderFriends(props.data.friends)}
        </div>
    )
}

export default Friends;