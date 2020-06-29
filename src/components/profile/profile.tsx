import React from "react";

import Myposts from "./myposts";
import ProfileInfo from "./profileinfo";
import {ActionType, PostType} from "../../redux/state";

type ProfileType = {
    posts: Array<PostType>,
    newPostText: string,
    // addPost: () => void,
    // updateNewPostText: (newText: string) => void,
    dispatch: (action: ActionType) => void,
}

// const Profile: React.FC<ProfileType> = ({posts, addPost, newPostText, updateNewPostText}) => {
const Profile: React.FC<ProfileType> = ({posts, dispatch, newPostText}) => {
    return (
        <div>
            <ProfileInfo/>
            {/*<Myposts updateNewPostText={updateNewPostText} addPost={addPost} posts={posts} newPostText={newPostText}/>*/}
            <Myposts dispatch={dispatch} posts={posts} newPostText={newPostText}/>
        </div>
    )
}

export default Profile;