import React from 'react';
import {Route, withRouter} from 'react-router-dom'

import './app.css';
import HeaderContainer from './components/header/HeaderContainer';
import Navbar from './components/navbar';
import store, {AppStateType} from './redux/redux-store';
import ProfileContainer from './components/profile/ProfileContainer';
import Login from './components/login/login';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {initializeAppThunkCreator} from './redux/app-reducer';
import {Preloader} from './components/common/Preloader/Preloader';
import {withSuspense} from './components/hoc/withSuspense';

const DialogsContainer = React.lazy(() => import('./components/dialogs/dialogsContainer'));
const UsersContainer = React.lazy(() => import('./components/users/UsersContainer'));
const News = React.lazy(() => import('./components/news'));
const Music = React.lazy(() => import('./components/music'));
const Settings = React.lazy(() => import('./components/settings'));

type AppPropsType = {
    initializeAppThunkCreator: () => void,
    initialized: boolean,
}

class App extends React.Component<AppPropsType, {}> {

    componentDidMount() {
        this.props.initializeAppThunkCreator();
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }

        const {friendsPage} = store.getState();

        return (
            <div className="app-wrapper">
                <HeaderContainer/>
                <Navbar data={friendsPage}/>
                <div className="app-wrapper-content">
                    <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>

                    <Route path='/dialogs' render={withSuspense(DialogsContainer)}/>

                    <Route path='/users' component={withSuspense(UsersContainer)}/>
                    <Route path='/login' render={() => <Login/>}/>

                    <Route path='/news' render={withSuspense(News)}/>
                    <Route path='/music' render={withSuspense(Music)}/>
                    <Route path='/settings' render={withSuspense(Settings)}/>
                </div>
            </div>
        )
    }
}

type MapStateToPropsType = {
    initialized: boolean
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    initialized: state.app.initialized
})

export default compose(
    withRouter,
    connect(mapStateToProps, {initializeAppThunkCreator})
)(App) as React.ComponentClass;