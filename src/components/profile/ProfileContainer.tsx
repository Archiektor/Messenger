import React, {Component} from "react";
import Profile from "./profile";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {showProfileThunkCreator, UserProfileType} from "../../redux/profile-reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";

type TParams = {
    userId: string,
}

type ProfileContainerType = RouteComponentProps<TParams> & {
    profile: UserProfileType,
    showProfileThunkCreator: (userId: string) => void,
    isAuth: boolean,
};

class ProfileContainer extends Component<ProfileContainerType, {}> {
    componentDidMount() {
        this.props.showProfileThunkCreator(this.props.match.params.userId)
    }

    render() {
        return (
            <Profile {...this.props} profile={this.props.profile}/>
        )
    }
}

// get state => throw state to props
let mapStateToProps = (state: AppStateType): { profile: UserProfileType, isAuth: boolean } => {
    return {
        profile: state.profilePage.profile,
        isAuth: state.auth.isAuth
    }
}

// return component with RoutePath
let withUrlDataContainerComponent = withRouter(ProfileContainer); // withRedirect()

export default connect(mapStateToProps, {showProfileThunkCreator})(withUrlDataContainerComponent);