import React, {Component, MouseEvent} from "react";
import axios from "axios";
import {UserType} from "../../redux/users-reducer";
import saitama from "../../assets/images/saitama.png";

import s from "./Users.module.scss";
import {BASE_URL} from "../../App";

type UserPropsType = {
    users: Array<UserType>,
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    followUser: (id: string) => void,
    unfollowUser: (id: string) => void,
    setUsers: (users: Array<UserType>) => void,
    setTotalUsersCount: (totalCount: number) => void,
    setCurrentPage: (currP: number) => void,
}

class Users extends Component<UserPropsType, {}> {

    componentDidMount() {
        // console.log("did mount started");
        axios.get(`${BASE_URL}/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                // debugger;
                this.props.setUsers(response.data.items);
                this.props.setTotalUsersCount(response.data.totalCount)
            })
    }

    onClickHandler = (pageNumber: number) => {
        // debugger;
        this.props.setCurrentPage(pageNumber);
        axios.get(`${BASE_URL}/users?page=${pageNumber}&count=${this.props.pageSize}`)
            .then(response => {
                // debugger;
                this.props.setUsers(response.data.items);
            })
    }

    render() {
        const {users, followUser, unfollowUser, currentPage} = this.props;
        // let pagesCount = Math.ceil(totalUsersCount / pageSize);

        let pages = [];
        // hardcode !!! better then pagesCount
        for (let i = 1; i < 10; i++) {
            pages.push(i);
        }

        return (
            <div>
                <h3 className={s.title}>Users</h3>
                <div className={s.selectPage}>
                    {
                        pages.map(page => <span
                            onClick={() => {
                                this.onClickHandler(page)
                            }}
                            className={currentPage === page ? `${s.selectPage_chosen}` : ``}
                            key={page}>{page}</span>)
                    }
                </div>
                {
                    users.map(user =>
                        <div key={user.id} className={s.wrapper}>
                            <div className={s.avaBlock}>
                                <img src={user.photos.small ? user.photos.small : saitama} alt="userAvatar"/>
                                {user.followed ?
                                    <button onClick={() => unfollowUser(user.id)}>{`Unfollow`}</button> :
                                    <button onClick={() => followUser(user.id)}>{`Follow`}</button>}
                            </div>
                            <div className={s.userBlock}>
                                <span className={s.userBlock__name}>{user.name}</span>
                                <span
                                    className={s.userBlock__location}>{`{user.location.country}, {user.location.city}`}</span>
                                <span className={s.userBlock__status}>{user.status}</span>
                            </div>
                        </div>)
                }
            </div>
        )
    }
}

export default Users;