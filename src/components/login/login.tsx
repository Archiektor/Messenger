import React from 'react';

import s from './login.module.scss';
import {Field, InjectedFormProps, reduxForm} from 'redux-form'
import {AppStateType} from '../../redux/redux-store';
import {createField, CustomInput} from '../common/FormsControl/FormsControl';
import {maxLengthCreator, required} from '../utils/validators/validators';
import {connect} from 'react-redux';
import {LoginMeThunkCreator, LoginOutThunkCreator} from '../../redux/auth-reducer';
import {Redirect} from 'react-router-dom';

type FormData = {
    email: string,
    password: string,
    rememberMe?: boolean,
    captcha?: boolean,
}
type LoginFormType = {
    onSubmit: (formData: FormData) => void,
    captcha: string | null,
}

type MapStateToProps = {
    isAuth: boolean,
    captchaUrl: string | null,
}

type MapDispatchToProps = {
    LoginMeThunkCreator: (login: string, password: string, rememberMe?: boolean, captcha?: boolean) => void,
    LoginOutThunkCreator: () => void,
}

type LoginType = MapStateToProps & MapDispatchToProps;

const Login: React.FC<LoginType> = ({isAuth, captchaUrl, LoginMeThunkCreator}) => {

    const onSubmitHandler = (formData: FormData) => {
        if (!isAuth) {
            //console.log(formData);
            const {email, password, rememberMe, captcha} = formData;
            LoginMeThunkCreator(email, password, rememberMe, captcha);
        }
    }

    if (isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return (
        <div className={s.wrapper}>
            <h1>Login</h1>
            <LoginReduxForm captcha={captchaUrl} onSubmit={onSubmitHandler}/>
        </div>
    )
}

const maxLength30 = maxLengthCreator(30);
const maxLength10 = maxLengthCreator(10);

const LoginForm: React.FC<InjectedFormProps<FormData, LoginFormType> & LoginFormType> = ({handleSubmit, error, captcha}) => {
    return (
        <form onSubmit={handleSubmit} className={s.form}>
            {createField('email', `Login:`, 'text', CustomInput, [required, maxLength30])}
            {createField('password', `Password:`, 'password', CustomInput, [required, maxLength30])}
            <div className={s.remember}>
                <Field name={'rememberMe'} component={CustomInput} type="checkbox"/>
                <span className={s.remember__span}>remember me</span>
            </div>
            {captcha && <img src={captcha} alt="captcha"/>}
            {captcha && createField('captcha', '', 'text', CustomInput, [maxLength10])}
            {error && <div className={s.summaryError}>{error}</div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm<FormData, LoginFormType>({
    // a unique name for the form
    form: 'login'
})(LoginForm)

/*type MapStateToProps = {
    isAuth: boolean,
    captchaUrl: string | null,
}*/

let mapStateToProps = (state: AppStateType): MapStateToProps => {
    return {
        isAuth: state.auth.isAuth,
        captchaUrl: state.auth.captchaUrl,
    }
}

export default connect<MapStateToProps, MapDispatchToProps, {}, AppStateType>(mapStateToProps, {
    LoginMeThunkCreator,
    LoginOutThunkCreator
})(Login);