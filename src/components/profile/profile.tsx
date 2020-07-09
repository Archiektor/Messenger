import React from "react";
import ProfileInfo from "./profileinfo";
import MyPostsContainer from "./myposts/myPostsContainer"
import {UserProfileType} from "../../redux/profile-reducer";

type ProfileType = {
    profile: UserProfileType,
}

const Profile: React.FC<ProfileType> = ({profile}) => {
    return (
        <div>
            <ProfileInfo profile={profile}/>
            <MyPostsContainer/>
        </div>
    )
}

export default Profile;