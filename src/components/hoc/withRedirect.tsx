import React from "react";
import {Redirect} from "react-router-dom";

type WithSomeProps = {
    isAuth: boolean,
}

export const withRedirect = <P extends object>(Component: React.ComponentType<P>) => {
    const RedirectComponent: React.FC<P & WithSomeProps> = (props) => {
        if (!props.isAuth) return <Redirect to={"/login"}/>
        return <Component {...props}/>
    }

/*    let mapStateToPropsForRedirect = (state: AppStateType): { isAuth: boolean } => {
        return {
            isAuth: state.auth.isAuth,
        }
    }
    let ConnectedRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent)*/

    return RedirectComponent;
}