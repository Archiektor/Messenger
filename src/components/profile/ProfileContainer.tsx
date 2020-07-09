import React, {Component} from "react";
import Profile from "./profile";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {setUserProfile, UserProfileType} from "../../redux/profile-reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {UserApi} from "../api/api";

type TParams = {
    userId: string,
}

type ProfileContainerType = RouteComponentProps<TParams> & {
    setUserProfile: (profile: UserProfileType) => void,
    profile: UserProfileType,
};

class ProfileContainer extends Component<ProfileContainerType, {}> {

    componentDidMount() {
        // debugger;
        UserApi.showProfile(this.props.match.params.userId)
            .then(data => {
                // debugger;
                this.props.setUserProfile(data);
            })
            .catch(console.log);
    }

    render() {
        return (
            <Profile {...this.props} profile={this.props.profile}/>
        )
    }
}

// get state => throw state to props
let mapStateToProps = (state: AppStateType): { profile: UserProfileType } => {
    // debugger;
    return {
        profile: state.profilePage.profile,
    }
}
// dispatch => do something with state
/*let mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        switchIsFetching: (isFetching: boolean) => {
            dispatch(switchIsFetchingAC(isFetching));
        },
    }
}*/

// return component with RoutePath
let withUrlDataContainerComponent = withRouter(ProfileContainer);

export default connect(mapStateToProps, {setUserProfile})(withUrlDataContainerComponent);