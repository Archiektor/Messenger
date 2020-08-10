import React, {Component} from 'react';
import Header from './header';
import {connect} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';
import {LoginOutThunkCreator} from '../../redux/auth-reducer';

type MapStateToProps = {
    login: string | null,
    isAuth: boolean,
}

type MapDispatchToProps = {
    LoginOutThunkCreator: () => void,
}

type HeaderContainerType = MapStateToProps & MapDispatchToProps;

class HeaderContainer extends Component<HeaderContainerType, {}> {

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

export default connect<MapStateToProps, MapDispatchToProps, {}, AppStateType>(mapStateToProps, {LoginOutThunkCreator})(HeaderContainer);