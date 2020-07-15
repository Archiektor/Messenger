import React from "react";
import {Route, withRouter} from "react-router-dom"

import "./app.css";
import HeaderContainer from "./components/header/HeaderContainer";
import Navbar from "./components/navbar";
import News from "./components/news";
import Music from "./components/music";
import Settings from "./components/settings";
import store, {AppStateType} from "./redux/redux-store";
import DialogsContainer from "./components/dialogs/dialogsContainer";
import UsersContainer from "./components/users/UsersContainer";
import ProfileContainer from "./components/profile/ProfileContainer";
import Login from "./components/login/login";
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeAppThunkCreator} from "./redux/app-reducer";
import {Preloader} from "./components/common/Preloader/Preloader";

type AppPropsType = {
    initializeAppThunkCreator: () => void,
    initialized: boolean,
}

class App extends React.Component<AppPropsType, {}> {

    componentDidMount() {
        this.props.initializeAppThunkCreator();
    }

    render() {
        if(!this.props.initialized){
            return <Preloader/>
        }

        const {friendsPage} = store.getState();

        return (
            <div className="app-wrapper">
                <HeaderContainer/>
                <Navbar data={friendsPage}/>
                <div className="app-wrapper-content">
                    <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>

                    <Route path='/dialogs' render={() => <DialogsContainer/>}/>

                    <Route path='/users' render={() => <UsersContainer/>}/>
                    <Route path='/login' render={() => <Login/>}/>

                    <Route path='/news' render={() => <News/>}/>
                    <Route path='/music' render={() => <Music/>}/>
                    <Route path='/settings' render={() => <Settings/>}/>
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