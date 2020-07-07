import {AppStateType} from "../../redux/redux-store";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {
    followAC,
    setCurrentPageAC,
    setTotalUsersCountAC,
    setUsersAC,
    unfollowAC,
    UserType
} from "../../redux/users-reducer";
import Users from "./Users";

// get state => throw state to props
let mapStateToProps = (state: AppStateType) => {
    // debugger;
    return {

        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
    }
}
// dispatch => do something with state
let mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        followUser: (userId: string) => {
            dispatch(followAC(userId))
        },
        unfollowUser: (userId: string) => {
            dispatch(unfollowAC(userId))
        },
        setUsers: (users: Array<UserType>) => {
            dispatch(setUsersAC(users))
        },
        setTotalUsersCount: (totalCount: number) => {
            dispatch(setTotalUsersCountAC(totalCount))
        },
        setCurrentPage: (currP : number) => {
            dispatch(setCurrentPageAC(currP));
        }
    }
}

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users)

export default UsersContainer;