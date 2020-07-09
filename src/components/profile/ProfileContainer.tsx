import React, {Component} from "react";
import Profile from "./profile";
import axios from "axios";
import {BASE_URL} from "../../App";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {setUserProfile, UserProfileType} from "../../redux/profile-reducer";
import { withRouter, RouteComponentProps } from "react-router-dom";

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
        axios.get(`${BASE_URL}/profile/${this.props.match.params.userId? this.props.match.params.userId : "2"}`)
            .then(response => {
                // debugger;
                this.props.setUserProfile(response.data);
            })
    }

    render() {
        return (
            <Profile {...this.props} profile={this.props.profile}/>
        )
    }
}

// get state => throw state to props
let mapStateToProps = (state: AppStateType) : {profile: UserProfileType} => {
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