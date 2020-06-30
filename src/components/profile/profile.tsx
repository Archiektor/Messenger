import React from "react";
import ProfileInfo from "./profileinfo";
import MyPostsContainer from "./myposts/myPostsContainer";

type ProfileType = {
}

const Profile: React.FC<ProfileType> = (props) => {
    return (
        <div>
            <ProfileInfo/>
            <MyPostsContainer/>
        </div>
    )
}

export default Profile;