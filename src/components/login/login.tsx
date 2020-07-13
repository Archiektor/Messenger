import React from "react";

import s from "./login.module.scss";
import {Field, InjectedFormProps, reduxForm} from 'redux-form'
import {AuthAPI} from "../api/api";
import {AppStateType} from "../../redux/redux-store";

type FormData = {
    login: string,
    password: string,
    rememberMe?: boolean,
    captcha?: boolean,
}
type LoginFormType = {
    onSubmit: (formData: FormData) => void,
}

const Login = () => {

    const onSubmitHandler = (formData: FormData) => {
        console.log(formData);
        AuthAPI.unloginMe()
            .then(data => {
                if (data.resultCode === 0) {
                    alert("Succesfully logout")
                } else {
                    const {login, password, rememberMe, captcha} = formData;
                    AuthAPI.loginMe(login, password, rememberMe)
                        .then(data => {
                            if (data.resultCode === 0) alert("Succesfully logined");
                        });
                }
            })
    }

    return (
        <div className={s.wrapper}>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmitHandler}/>
        </div>
    )
}

const LoginForm: React.FC<InjectedFormProps<FormData, LoginFormType> & LoginFormType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={s.form}>
            <div>
                <Field name={"login"} type="text" placeholder={`Login:`} component={"input"}/>
            </div>
            <div>
                <Field name={"password"} type="password" placeholder={`Password:`} component={"input"}/>
            </div>
            <div>
                <Field name={"rememberMe"} component={"input"} type="checkbox"/> remember me
            </div>
            <div>
                <button>Login</button>
                <button>Logout</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm<FormData, LoginFormType>({
    // a unique name for the form
    form: 'login'
})(LoginForm)

let mapStateToProps = (state: AppStateType) => ({});

export default Login;