import React from "react";
import s from "./Users.module.scss";
import saitama from "../../assets/images/saitama.png";
import {UserType} from "../../redux/users-reducer";
import {NavLink} from "react-router-dom";

type UsersType = {
    users: Array<UserType>,
    currentPage: number,
    followUser: (id: string) => void,
    unfollowUser: (id: string) => void,
    onClickHandler: (pageNumber: number) => void,
}

export const Users: React.FC<UsersType> = ({users, currentPage, followUser, unfollowUser, onClickHandler}) => {
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
                            onClickHandler(page)
                        }}
                        className={currentPage === page ? `${s.selectPage_chosen}` : ``}
                        key={page}>{page}</span>)
                }
            </div>
            {
                users.map(user =>
                    <div key={user.id} className={s.wrapper}>
                        <div className={s.avaBlock}>
                            <NavLink to={`/profile/${user.id}`}>
                                <img src={user.photos.small ? user.photos.small : saitama} alt="userAvatar"/>
                            </NavLink>
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

