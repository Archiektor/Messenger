import React from "react";
import ProfileInfo from "./profileinfo";
import MyPostsContainer from "./myposts/myPostsContainer"
import {UserProfileType} from "../../redux/profile-reducer";

type ProfileType = {
    profile: UserProfileType,
    status: string,
    updateStatusThunkCreator: (status: string) => void,
    isOwner: boolean,
    savePhoto: (file:File) => void,
}

const Profile: React.FC<ProfileType> = ({savePhoto, isOwner, profile, status, updateStatusThunkCreator}) => {
    return (
        <div>
            <ProfileInfo savePhoto={savePhoto} isOwner={isOwner} profile={profile} status={status} updateStatusThunkCreator = {updateStatusThunkCreator}/>
            <MyPostsContainer/>
        </div>
    )
}

export default Profile;