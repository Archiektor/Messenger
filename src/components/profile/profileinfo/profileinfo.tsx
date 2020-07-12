import React from "react";

import css from "./profileinfo.module.css";
import {UserProfileType} from "../../../redux/profile-reducer";
import {Preloader} from "../../common/Preloader/Preloader";
import ProfileStatus from "./ProfileStatus";

type ProfileInfoType = {
    profile: UserProfileType,
}

const ProfileInfo: React.FC<ProfileInfoType> = (props) => {
    // debugger;
    if (!props.profile) {
        return <Preloader/>
    } else {
        return (
            <div className={css.wrapper}>
                <div className={css.border}>
                    <img className={css.bgImg}
                         src="https://cdn57.androidauthority.net/wp-content/uploads/2015/11/00-best-backgrounds-and-wallpaper-apps-for-android.jpg"
                         alt={"attractda"}/>
                </div>
                <div className={css.mainInfo}>
                    <img className={css.profImg}
                         src={props.profile.photos === null ? "https://c7.hotpng.com/preview/483/187/617/one-punch-man-youtube-saitama-desktop-wallpaper-one-punch-man.jpg" : props.profile.photos.small}
                         alt={""}/>
                    <div className={css.userInfo}>
                        <h2>{props.profile.fullName}</h2>
                        <ProfileStatus status={"Want to drink coffe"}/>
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