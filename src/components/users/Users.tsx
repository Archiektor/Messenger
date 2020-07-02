import React from "react";
import {UserType} from "../../redux/users-reducer";
import saitama from "../../assets/images/saitama.png";

import s from "./Users.module.scss";
import {v1} from "uuid";

type UserPropsType = {
    users: Array<UserType>,
    followUser: (id: string) => void,
    unfollowUser: (id: string) => void,
    setUsers: (users: Array<UserType>) => void,
}

const Users: React.FC<UserPropsType> = ({users, followUser, unfollowUser, setUsers}) => {
    // debugger;
    if (users.length === 0) {
        setUsers([
            {
                id: v1(),
                photoUrl: "",
                followed: false,
                fullName: "Nikki Odd",
                location: {country: "Poland", city: "Szczecin"},
                status: "I'm looking for job now..."
            },
            {
                id: v1(),
                photoUrl: "",
                followed: false,
                fullName: "Anna Po-po",
                location: {country: "Poland", city: "Warsaw"},
                status: "I'm so pretty"
            },
            {
                id: v1(),
                photoUrl: "",
                followed: true,
                fullName: "Dima Ho",
                location: {country: "Belarus", city: "Minsk"},
                status: "When this learning ends ?"
            },
            {
                id: v1(),
                photoUrl: "",
                followed: true,
                fullName: "Ala Pu",
                location: {country: "United States", city: "Chicago"},
                status: "Make some party !"
            },
        ])

    }

    return (
        <div>
            <h3>Users</h3>
            {
                users.map(user =>
                    <div key={user.id} className={s.wrapper}>
                        <div className={s.avaBlock}>
                            <img src={saitama} alt="userAvatar"/>
                            {user.followed ?
                                <button onClick={() => unfollowUser(user.id)}>{`Unfollow`}</button> :
                                <button onClick={() => followUser(user.id)}>{`Follow`}</button>}
                        </div>
                        <div className={s.userBlock}>
                            <span className={s.userBlock__name}>{user.fullName}</span>
                            <span
                                className={s.userBlock__location}>{`${user.location.country}, ${user.location.city}`}</span>
                            <span className={s.userBlock__status}>{user.status}</span>
                        </div>
                    </div>)
            }
        </div>
    )
}

export default Users;