import {AppStateType} from "../../redux/redux-store";
import {connect} from "react-redux";
import {
    follow,
    setCurrentPage,
    setTotalUsersCount,
    setUsers,
    switchIsFetching,
    unfollow,
    UserType
} from "../../redux/users-reducer";
import React, {Component} from "react";
import {Users} from "./Users";
import {Preloader} from "../common/Preloader/Preloader";
import {UserApi} from "../api/api";


type UserPropsType = {
    users: Array<UserType>,
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    isFetching: boolean,
    follow: (id: string) => void,
    unfollow: (id: string) => void,
    setUsers: (users: Array<UserType>) => void,
    setTotalUsersCount: (totalCount: number) => void,
    setCurrentPage: (currP: number) => void,
    switchIsFetching: (isFetch: boolean) => void,

}

class UsersContainer extends Component<UserPropsType, {}> {

    componentDidMount() {
        this.props.switchIsFetching(true);
        UserApi.getUsers(this.props.currentPage, this.props.pageSize)
            .then(response => {
                // debugger;
                this.props.switchIsFetching(false);
                this.props.setUsers(response.items);
                this.props.setTotalUsersCount(response.totalCount)
            })
            .catch(console.log);
    }

    onClickHandler = (pageNumber: number) => {
        // debugger;
        this.props.switchIsFetching(true);
        this.props.setCurrentPage(pageNumber);
        UserApi.getUsers(pageNumber, this.props.pageSize)
            .then(response => {
                // debugger;
                this.props.switchIsFetching(false);
                this.props.setUsers(response.items);
            })
            .catch(console.log);
    }

    render() {
        const {users, follow, unfollow, currentPage, isFetching} = this.props;

        return (
            <React.Fragment>
                {isFetching && <Preloader/>}
                {!isFetching && <Users users={users}
                                       followUser={follow}
                                       unfollowUser={unfollow}
                                       currentPage={currentPage}
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
    }
}
// dispatch => do something with state
/*let mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        followUser: (userId: string) => {
            dispatch(followAC(userId))
        },
        switchIsFetching: (isFetching: boolean) => {
            dispatch(switchIsFetchingAC(isFetching));
        },
    }
}*/

export default connect(mapStateToProps,
    {
        follow, unfollow, setUsers, setTotalUsersCount,
        setCurrentPage, switchIsFetching,
    })(UsersContainer);
