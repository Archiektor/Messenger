import React from 'react';
import s from './Users.module.scss';
import {NavLink} from 'react-router-dom';
import saitama from '../../assets/images/saitama.png';
import {UserType} from '../../redux/users-reducer';

type UserPropsType = {
    user: UserType,
    disabledUsers: Array<string>,
    followUserThunkCreator: (userId: string) => void,
    unfollowUserThunkCreator: (userId: string) => void,
}

const User: React.FC<UserPropsType> = ({user, disabledUsers, followUserThunkCreator, unfollowUserThunkCreator}) => {
    return (
        <div className={s.wrapper}>
            <div className={s.avaBlock}>
                <NavLink to={`/profile/${user.id}`}>
                    <img src={user.photos.small ? user.photos.small : saitama} alt="userAvatar"/>
                </NavLink>
                {user.followed ?
                    <button disabled={disabledUsers.some(id => id === user.id)}
                            onClick={() => unfollowUserThunkCreator(user.id)}>{`Unfollow`}</button> :
                    <button disabled={disabledUsers.some(id => id === user.id)}
                            onClick={() => followUserThunkCreator(user.id)}>{`Follow`}</button>}
            </div>
            <div className={s.userBlock}>
                <span className={s.userBlock__name}>{user.name}</span>
                <span
                    className={s.userBlock__location}>{`{user.location.country}, {user.location.city}`}</span>
                <span className={s.userBlock__status}>{user.status}</span>
            </div>
        </div>
    )
}

export default User;