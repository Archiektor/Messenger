import React, {ChangeEvent} from 'react';

import css from './profileinfo.module.css';
import {UserProfileType} from '../../../redux/profile-reducer';
import {Preloader} from '../../common/Preloader/Preloader';
import ProfileStatusHooks from './ProfileStatusHooks';
import saitama from '../../../assets/images/saitama.png';

type ProfileInfoType = {
    profile: UserProfileType,
    status: string,
    updateStatusThunkCreator: (status: string) => void,
    isOwner: boolean,
    savePhoto: (file: File) => void,
}

const ProfileInfo: React.FC<ProfileInfoType> = (props) => {
    const onMainPhotoSelected = (e:ChangeEvent<HTMLInputElement>) => {
        if(e.currentTarget.files!.length) {
            props.savePhoto(e.currentTarget.files![0]);
        }
    }

    // debugger;
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
                <div className={css.mainInfo}>
                   <div className={css.personImg}>
                       <img className={css.profImg}
                            src={props.profile.photos.small || saitama}
                            alt={''}/>
                       {props.isOwner && <input onChange={onMainPhotoSelected} type={"file"}/>}
                   </div>
                    <div className={css.userInfo}>
                        <h2>{props.profile.fullName}</h2>
                        <ProfileStatusHooks status={props.status} updateStatus={props.updateStatusThunkCreator}/>
                        <p>{props.profile.lookingForAJobDescription}</p>
                        <p>{props.profile.aboutMe ? props.profile.aboutMe : 'null'}</p>
                        <hr/>
                        <div className={css.textWrapper}>
                            <span>{`fb: ${props.profile.contacts.facebook}`}</span>
                            <span>{`github: ${props.profile.contacts.github}`}</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default ProfileInfo;