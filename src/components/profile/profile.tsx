import React from "react";
import ProfileInfo from "./profileinfo";
import MyPostsContainer from "./myposts/myPostsContainer"
import {UserProfileType} from "../../redux/profile-reducer";
import {ProfileDataForm} from './ProfileDataForm/ProfileDataForm';

type ProfileType = {
    profile: UserProfileType,
    status: string,
    updateStatusThunkCreator: (status: string) => void,
    isOwner: boolean,
    savePhoto: (file:File) => void,
    saveProfile: (formData: ProfileDataForm) => void,
}

const Profile: React.FC<ProfileType> = ({saveProfile, savePhoto, isOwner, profile, status, updateStatusThunkCreator}) => {
    return (
        <div>
            <ProfileInfo saveProfile={saveProfile} savePhoto={savePhoto} isOwner={isOwner} profile={profile} status={status} updateStatusThunkCreator = {updateStatusThunkCreator}/>
            <MyPostsContainer/>
        </div>
    )
}

export default Profile;