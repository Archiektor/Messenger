import React from "react";

import css from "./friends.module.css";
import {NavbarType} from "../navbar/navbar";
import {FriendType} from "../../redux/friends-reducer";

const renderFriends = (arr: Array<FriendType>) => {
    return arr.map(friend => {
                return (
                    <div key={friend.id} className={css.oneFriendWrapper}>
                        <div className={css.oneFriendPicture}/>
                        <div className={css.oneFriendName}>{friend.name}</div>
                    </div>
                )
    })
}

const Friends: React.FC<NavbarType> = React.memo((props: any) => {
    return (
        <div className={css.friendsWrapper}>
            {renderFriends(props.data.friends)}
        </div>
    )
})

export default Friends;