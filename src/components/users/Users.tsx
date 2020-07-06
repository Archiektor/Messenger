import React, {Component} from "react";
import axios from "axios";
import {UserType} from "../../redux/users-reducer";
import saitama from "../../assets/images/saitama.png";

import s from "./Users.module.scss";
import {BASE_URL} from "../../App";

type UserPropsType = {
    users: Array<UserType>,
    followUser: (id: string) => void,
    unfollowUser: (id: string) => void,
    setUsers: (users: Array<UserType>) => void,
}

class Users extends Component<UserPropsType, {}> {

    componentDidMount() {
        // console.log("did mount started");
        axios.get(`${BASE_URL}/users`)
            .then(response => {
                this.props.setUsers(response.data.items);
            })
    }

    render() {
        const {users, followUser, unfollowUser} = this.props;

        return (
            <div>
                <h3 className={s.title}>Users</h3>
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