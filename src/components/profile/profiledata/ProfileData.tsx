import React, {ChangeEvent} from 'react';
import css from './ProfileData.module.css';
import saitama from '../../../assets/images/saitama.png';
import ProfileStatusHooks from '../profileinfo/ProfileStatusHooks';
import {updateStatusThunkCreator, UserProfileType} from '../../../redux/profile-reducer';

type ProfileDataType = {
    profile: UserProfileType,
    savePhoto: (file: File) => void,
    status: string,
    isOwner: boolean,
    gotoEditMode: () => void,
}

export const ProfileData: React.FC<ProfileDataType> = ({profile, savePhoto, status, isOwner, gotoEditMode}) => {
    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.files!.length) {
            savePhoto(e.currentTarget.files![0]);
        }
    }

    return (
        <React.Fragment>
            <div className={css.mainInfo}>
                {isOwner && <div>
                    <button className={css.btn} onClick={gotoEditMode}>Edit</button>
                </div>}
                <div className={css.personImg}>
                    <img className={css.profImg}
                         src={profile!.photos.small || saitama}
                         alt={''}/>
                    {isOwner && <input onChange={onMainPhotoSelected} type={'file'}/>}
                </div>
                <div className={css.userInfo}>
                    <h2>{profile!.fullName}</h2>
                    <ProfileStatusHooks status={status} updateStatus={updateStatusThunkCreator}/>
                    <p>{`looking for a job : ${profile!.lookingForAJob}`}</p>
                    {profile!.lookingForAJob && <p>{`job description: ${profile!.lookingForAJobDescription}`}</p>}
                    <p>{`About me: `}{profile!.aboutMe ? profile!.aboutMe : 'null'}</p>
                    <hr/>
                    <div className={css.textWrapper}>
                        <span>{`fb: ${profile!.contacts.facebook}`}</span>
                        <span>{`github: ${profile!.contacts.github}`}</span>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}