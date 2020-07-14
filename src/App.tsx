import React from "react";
import {Route, withRouter} from "react-router-dom"

import "./app.css";
import HeaderContainer from "./components/header/HeaderContainer";
import Navbar from "./components/navbar";
import News from "./components/news";
import Music from "./components/music";
import Settings from "./components/settings";
import store from "./redux/redux-store";
import DialogsContainer from "./components/dialogs/dialogsContainer";
import UsersContainer from "./components/users/UsersContainer";
import ProfileContainer from "./components/profile/ProfileContainer";
import Login from "./components/login/login";
import {connect} from "react-redux";
import {AuthMeThunkCreator} from "./redux/auth-reducer";
import {compose} from "redux";

type AppPropsType = {
    AuthMeThunkCreator: () => void,
}

class App extends React.Component<AppPropsType, {}> {

    componentDidMount() {
        this.props.AuthMeThunkCreator();
    }

    render() {
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

export default compose(
    withRouter,
    connect(null, {AuthMeThunkCreator})
)(App) as React.ComponentClass;