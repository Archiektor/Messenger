import {AppStateType} from '../../redux/redux-store';
import {connect} from 'react-redux';
import {
    followUserThunkCreator,
    getUsersThunkCreator,
    setCurrentPage,
    unfollowUserThunkCreator,
    UserType
} from '../../redux/users-reducer';
import React, {PureComponent} from 'react';
import {Users} from './Users';
import {Preloader} from '../common/Preloader/Preloader';
import {
    getCurrentPage,
    getDisabledUsers,
    getIsFetching,
    getIsLoading,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from '../../redux/users-selectors';


type UserPropsType = {
    users: Array<UserType>,
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    isFetching: boolean,
    setCurrentPage: (currP: number) => void,
    isLoading: boolean,
    disabledUsers: Array<string>,
    getUsersThunkCreator: (currentPage: number, pageSize: number) => void,
    followUserThunkCreator: (userId: string) => void,
    unfollowUserThunkCreator: (userId: string) => void,
}

class UsersContainer extends PureComponent<UserPropsType, {}> {

    componentDidMount() {
        let {currentPage, pageSize, getUsersThunkCreator} = this.props;
        getUsersThunkCreator(currentPage, pageSize);
    }

    onClickHandler = (pageNumber: number) => {
        let {pageSize, getUsersThunkCreator, setCurrentPage} = this.props;
        setCurrentPage(pageNumber);
        getUsersThunkCreator(pageNumber, pageSize);
    }

    render() {
        // debugger;
        const {users, currentPage, isFetching, isLoading, disabledUsers, pageSize, totalUsersCount} = this.props;

        return (
            <React.Fragment>
                {isFetching && <Preloader/>}
                {!isFetching && <Users users={users}
                                       followUserThunkCreator={this.props.followUserThunkCreator}
                                       unfollowUserThunkCreator={this.props.unfollowUserThunkCreator}
                                       currentPage={currentPage}
                                       isLoading={isLoading}
                                       disabledUsers={disabledUsers}
                                       onClickHandler={this.onClickHandler}
                                       pageSize={pageSize}
                                       totalUsersCount={totalUsersCount}
                />}
            </React.Fragment>
        )
    }
}

// get state => throw state to props
let mapStateToProps = (state: AppStateType) => ({
    users: getUsers(state),
    // users: getUsersSelector(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    isLoading: getIsLoading(state),
    disabledUsers: getDisabledUsers(state),
})

export default connect(mapStateToProps,
    {setCurrentPage, getUsersThunkCreator, unfollowUserThunkCreator, followUserThunkCreator})(UsersContainer);
