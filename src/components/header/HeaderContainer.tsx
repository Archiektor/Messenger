import React, {Component} from "react";
import Header from "./header";
import {connect} from "react-redux";
import {AuthMeThunkCreator} from "../../redux/auth-reducer";
import {AppStateType} from "../../redux/redux-store";

type HeaderContainerType = {
    login: string | null,
    isAuth: boolean,
    AuthMeThunkCreator: () => void,
}

class HeaderContainer extends Component<HeaderContainerType, {}> {
    componentDidMount() {
        this.props.AuthMeThunkCreator();
        /*        UserApi.authMe()
                    .then(data => {
                        // debugger;
                        if (data.resultCode === 0) {
                            this.props.setAuthUserData(data.data);
                        }
                    })
                    .catch(console.log);*/
    }

    render() {
        return (
            <Header {...this.props}/>
        );
    }
}

const mapStateToProps = (state: AppStateType) => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login,
    }
}

export default connect(mapStateToProps, {AuthMeThunkCreator})(HeaderContainer);