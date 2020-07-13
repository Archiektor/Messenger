import React from "react";

import s from "./login.module.scss";

const Login = () => {
    return (
        <div className={s.wrapper}>
            <h1>Login</h1>
            <LoginForm/>
        </div>
    )
}

const LoginForm = () => {
    return (
        <form className={s.form}>
            <div>
                <input type="text" placeholder={`Login:`}/>
            </div>
            <div>
                <input type="password" placeholder={`Password:`}/>
            </div>
            <div>
                <input type="checkbox"/> remember me
            </div>
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

export default Login;