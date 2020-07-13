import React from "react";
import ProfileInfo from "./profileinfo";
import MyPostsContainer from "./myposts/myPostsContainer"
import {UserProfileType} from "../../redux/profile-reducer";

type ProfileType = {
    profile: UserProfileType,
    status: string,
    updateStatusThunkCreator: (status: string) => void,
}

const Profile: React.FC<ProfileType> = ({profile, status, updateStatusThunkCreator}) => {
    return (
        <div>
            <ProfileInfo profile={profile} status={status} updateStatusThunkCreator = {updateStatusThunkCreator}/>
            <MyPostsContainer/>
        </div>
    )
}

export default Profile;