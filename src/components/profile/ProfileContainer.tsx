import React, {PureComponent} from 'react';
import Profile from './profile';
import {connect} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';
import {
    getStatusThunkCreator,
    savePhotoThunkCreator,
    saveProfileThunkCreator,
    showProfileThunkCreator,
    updateStatusThunkCreator
} from '../../redux/profile-reducer';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {ProfileDataForm} from './ProfileDataForm/ProfileDataForm';

type PathParamsType = {
    userId: string,
}

type MapPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchToPropsType = {
    showProfileThunkCreator: (userId: number) => void,
    getStatusThunkCreator: (userId: number) => void,
    updateStatusThunkCreator: (status: string) => void,
    savePhotoThunkCreator: (file: File) => void,
    saveProfileThunkCreator: (formData: ProfileDataForm) => void,
}

type ProfileContainerType = RouteComponentProps<PathParamsType> & MapPropsType & MapDispatchToPropsType;

class ProfileContainer extends PureComponent<ProfileContainerType, {}> {

    refreshProfile() {
        let userId: string | number | null = this.props.match.params.userId
        if (!userId) {
            userId = this.props.authorizedUserId;
            if (!userId) {
                this.props.history.push('/login');
                return;
            }
        }
        this.props.showProfileThunkCreator(Number(userId));
        this.props.getStatusThunkCreator(Number(userId));
    }

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps: Readonly<ProfileContainerType>, prevState: Readonly<{}>) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile();
        }
    }

    render() {
        return (
            <Profile {...this.props} profile={this.props.profile} status={this.props.status}
                     updateStatusThunkCreator={this.props.updateStatusThunkCreator}
                     isOwner={!this.props.match.params.userId}
                     savePhoto={this.props.savePhotoThunkCreator}
                     saveProfile={this.props.saveProfileThunkCreator}
            />
        )
    }
}

// get state => throw state to props
let mapStateToProps = (state: AppStateType) => {
    return {
        profile: state.profilePage.profile,
        isAuth: state.auth.isAuth,
        status: state.profilePage.status,
        authorizedUserId: state.auth.id
    }
}

// return component with RoutePath
let withUrlDataContainerComponent = withRouter(ProfileContainer); // withRedirect()

export default connect<MapPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, {
    showProfileThunkCreator,
    getStatusThunkCreator,
    updateStatusThunkCreator,
    savePhotoThunkCreator,
    saveProfileThunkCreator,
})(withUrlDataContainerComponent);