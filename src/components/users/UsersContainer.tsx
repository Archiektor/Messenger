import {AppStateType} from "../../redux/redux-store";
import {connect} from "react-redux";
import {
    followUserThunkCreator,
    getUsersThunkCreator,
    setCurrentPage,
    unfollowUserThunkCreator,
    UserType
} from "../../redux/users-reducer";
import React, {Component} from "react";
import {Users} from "./Users";
import {Preloader} from "../common/Preloader/Preloader";


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

class UsersContainer extends Component<UserPropsType, {}> {

    componentDidMount() {
        // debugger;
        this.props.getUsersThunkCreator(this.props.currentPage, this.props.pageSize);
    }

    onClickHandler = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber);
        this.props.getUsersThunkCreator(pageNumber, this.props.pageSize);
    }

    render() {
        // debugger;
        const {users, currentPage, isFetching, isLoading, disabledUsers} = this.props;

        return (
            <React.Fragment>
                {isFetching && <Preloader/>}
                {!isFetching && <Users users={users}
                                       followUserThunkCreator={this.props.followUserThunkCreator}
                                       unfollowUserThunkCreator={this.props.unfollowUserThunkCreator}
                                       currentPage={currentPage}
                                       isLoading={isLoading}
                                       disabledUsers={disabledUsers}
                                       onClickHandler={this.onClickHandler}/>}
            </React.Fragment>
        )
    }
}

// get state => throw state to props
let mapStateToProps = (state: AppStateType) => {
    // debugger;
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        isLoading: state.usersPage.isLoading,
        disabledUsers: state.usersPage.disabledUsers,
    }
}

// export default compose(
//     withRedirect,
//     connect(mapStateToProps,
//         {setCurrentPage, getUsersThunkCreator, unfollowUserThunkCreator, followUserThunkCreator})
// )(UsersContainer)

export default connect(mapStateToProps,
    {setCurrentPage, getUsersThunkCreator, unfollowUserThunkCreator, followUserThunkCreator})(UsersContainer);
