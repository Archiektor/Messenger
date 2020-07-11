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
};

class ProfileContainer extends Component<ProfileContainerType, {}> {

    componentDidMount() {
        this.props.showProfileThunkCreator(this.props.match.params.userId)
        /*        UserApi.showProfile(this.props.match.params.userId)
                    .then(data => {
                        this.props.setUserProfile(data);
                    })
                    .catch(console.log);*/
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

export default connect(mapStateToProps, {showProfileThunkCreator})(withUrlDataContainerComponent);