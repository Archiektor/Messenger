import React from "react";

import Myposts from "./myposts";
import ProfileInfo from "./profileinfo";
import {PostType} from "../../redux/state";

type ProfileType = {
    posts: Array<PostType>,
    addPost: () => void,
    newPostText: string,
    updateNewPostText: (newText: string) => void,
}

const Profile: React.FC<ProfileType> = ({posts, addPost, newPostText, updateNewPostText}) => {
    return (
        <div>
            <ProfileInfo/>
            <Myposts updateNewPostText={updateNewPostText} addPost={addPost} posts={posts} newPostText={newPostText}/>
        </div>
    )
}

export default Profile;