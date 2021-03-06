import React from "react";
import {Redirect} from "react-router-dom";

type WithSomeProps = {
    isAuth: boolean,
}

export const withRedirect = <P extends object>(Component: React.ComponentType<P>) => {
    return (props: P & WithSomeProps) => {
        if (!props.isAuth) return <Redirect to={"/login"}/>
        return <Component {...props}/>
    }
}