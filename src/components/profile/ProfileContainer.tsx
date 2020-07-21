import React, {PureComponent} from 'react';
import Profile from './profile';
import {connect} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';
import {
    getStatusThunkCreator,
    showProfileThunkCreator,
    updateStatusThunkCreator,
    UserProfileType
} from '../../redux/profile-reducer';
import {RouteComponentProps, withRouter} from 'react-router-dom';

type TParams = {
    userId: string,
}

type ProfileContainerType = RouteComponentProps<TParams> & {
    profile: UserProfileType,
    isAuth: boolean,
    status: string,
    authorizedUserId: number | null,
    showProfileThunkCreator: (userId: number) => void,
    getStatusThunkCreator: (userId: number) => void,
    updateStatusThunkCreator: (status: string) => void,
};

class ProfileContainer extends PureComponent<ProfileContainerType, {}> {
    componentDidMount() {
        let userId: string | number | null = this.props.match.params.userId
        // debugger;
        if (!userId) {
            userId = this.props.authorizedUserId;
            if (!userId) {
                // debugger;
                this.props.history.push('/login');
                return;
            }
        }
        this.props.showProfileThunkCreator(Number(userId));
        this.props.getStatusThunkCreator(Number(userId));
    }

    render() {
        return (
            <Profile {...this.props} profile={this.props.profile} status={this.props.status}
                     updateStatusThunkCreator={this.props.updateStatusThunkCreator}/>
        )
    }
}

type MapStatePropsType = {
    profile: UserProfileType,
    isAuth: boolean,
    status: string,
    authorizedUserId: number | null,
}

// get state => throw state to props
let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        profile: state.profilePage.profile,
        isAuth: state.auth.isAuth,
        status: state.profilePage.status,
        authorizedUserId: state.auth.id
    }
}

// return component with RoutePath
let withUrlDataContainerComponent = withRouter(ProfileContainer); // withRedirect()

export default connect(mapStateToProps, {
    showProfileThunkCreator,
    getStatusThunkCreator,
    updateStatusThunkCreator
})(withUrlDataContainerComponent);