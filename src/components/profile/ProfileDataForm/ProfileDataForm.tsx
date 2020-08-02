import React from 'react';
import {createField, CustomInput, CustomTextArea} from '../../common/FormsControl/FormsControl';
import {InjectedFormProps, reduxForm} from 'redux-form'
import s from './ProfileDataForm.module.scss';

export type ProfileDataForm = {
    aboutMe: string,
    fullName: string,
    lookingForAJob: boolean,
    lookingForAJobDescription: string,
    initialValues: any
}

type ProfileDataFormType = {
    onSubmit: (formData: ProfileDataForm) => void,
}

const ProfileDataForm: React.FC<InjectedFormProps<ProfileDataForm, ProfileDataFormType> & ProfileDataFormType> =
    ({handleSubmit, error}) => {
    return (
        <form onSubmit={handleSubmit} className={s.formWrapper}>
            <button className={s.formWrapper__btn}>Submit</button>
            {error && <div className={s.formWrapper__error}>{error}</div>}
            <div className={s.formWrapper__name}>
                <b>Full name:</b> {createField('fullName', 'Full name:', 'text', CustomInput, [])}
            </div>
            <div className={s.formWrapper__job}>
                <b>Looking for a job:</b> {createField('lookingForAJob', '', 'checkbox', CustomInput, [])}
            </div>
            <div className={s.formWrapper__skills}>
                <b>My professional
                    skills:</b>{createField('lookingForAJobDescription', 'my skills:', '', CustomTextArea, [])}
            </div>
            <div className={s.formWrapper__about}>
                <b>About me:</b>{createField('aboutMe', 'About me:', 'tex', CustomTextArea, [])}
            </div>
        </form>
    )
}

const ProfileDataFormReduxForm = reduxForm<ProfileDataForm, ProfileDataFormType>({form: 'edit-profile'})(ProfileDataForm)

export default ProfileDataFormReduxForm;
