import React from "react";
import s from "./Users.module.scss";
import saitama from "../../assets/images/saitama.png";
import {UserType} from "../../redux/users-reducer";
import {NavLink} from "react-router-dom";

type UsersType = {
    users: Array<UserType>,
    currentPage: number,
    onClickHandler: (pageNumber: number) => void,
    isLoading: boolean,
    disabledUsers: Array<string>,
    followUserThunkCreator: (userId: string) => void,
    unfollowUserThunkCreator: (userId: string) => void,
}

export const Users: React.FC<UsersType> = ({
                                               users, currentPage,
                                               onClickHandler, disabledUsers, followUserThunkCreator, unfollowUserThunkCreator
                                           }) => {
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
                                <button disabled={disabledUsers.some(id => id === user.id)}
                                        onClick={() => {
                                            unfollowUserThunkCreator(user.id);
                                            /*                                    switchIsLoading(true, user.id);
                                                                                UserApi.unfollowUser(user.id)
                                                                                    .then(data => {
                                                                                        switchIsLoading(false, user.id);
                                                                                        if (data.resultCode === 0) {
                                                                                            unfollowUser(user.id);
                                                                                        }
                                                                                    })
                                                                                    .catch(console.log);*/
                                        }}>{`Unfollow`}</button> :
                                <button disabled={disabledUsers.some(id => id === user.id)}
                                        onClick={() => {
                                            // debugger;
                                            followUserThunkCreator(user.id);
                                        }}>{`Follow`}</button>}
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

