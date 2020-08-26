import React, {useEffect, useState} from 'react';

import css from './profileinfo.module.css';
import {UserProfileType} from '../../../redux/profile-reducer';
import {Preloader} from '../../common/Preloader/Preloader';
import {ProfileData} from '../profiledata/ProfileData';
import ProfileDataFormReduxForm, {ProfileDataForm} from '../ProfileDataForm/ProfileDataForm';

type ProfileInfoType = {
    profile: UserProfileType,
    status: string,
    updateStatusThunkCreator: (status: string) => void,
    isOwner: boolean,
    savePhoto: (file: File) => void,
    saveProfile: (formData: ProfileDataForm) => void,
}

const ProfileInfo: React.FC<ProfileInfoType> = (props) => {
    const [editMode, setEditMode] = useState<boolean>(false);

    const onSubmit = (formData: ProfileDataForm) => {
        props.saveProfile(formData);
    }

    useEffect(() => {
        setEditMode(false);
    }, [props.profile])

    if (!props.profile) {
        return <Preloader/>
    } else {
        return (
            <div className={css.wrapper}>
                <div className={css.border}>
                    <img className={css.bgImg}
                         src="https://cdn57.androidauthority.net/wp-content/uploads/2015/11/00-best-backgrounds-and-wallpaper-apps-for-android.jpg"
                         alt={'attractda'}/>
                </div>
                {editMode ? <ProfileDataFormReduxForm onSubmit={onSubmit} initialValues={props.profile}/> :
                    <ProfileData profile={props.profile} status={props.status} savePhoto={props.savePhoto}
                                 isOwner={props.isOwner} gotoEditMode={() => setEditMode(true)}/>}
            </div>
        )
    }
}

export default ProfileInfo;