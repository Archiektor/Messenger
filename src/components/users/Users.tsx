import React from 'react';
import s from './Users.module.scss';
import {UserType} from '../../redux/users-reducer';
import Paginator from '../common/Paginator/Paginator';
import User from './User';

type UsersType = {
    users: Array<UserType>,
    currentPage: number,
    onClickHandler: (pageNumber: number) => void,
    isLoading: boolean,
    disabledUsers: Array<string>,
    followUserThunkCreator: (userId: string) => void,
    unfollowUserThunkCreator: (userId: string) => void,
    pageSize: number,
    totalUsersCount: number,
}

export const Users: React.FC<UsersType> = React.memo(({
                                                          users, currentPage, pageSize, totalUsersCount,
                                                          onClickHandler, disabledUsers, followUserThunkCreator, unfollowUserThunkCreator
                                                      }) => {

    return (
        <div>
            <h3 className={s.title}>Users</h3>
            <Paginator totalItemsCount={totalUsersCount} pageSize={pageSize } onClickHandler={onClickHandler} currentPage={currentPage}/>
            {
                users.map(user =>
                    <User key={user.id} user={user} disabledUsers={disabledUsers}
                          followUserThunkCreator={followUserThunkCreator}
                          unfollowUserThunkCreator={unfollowUserThunkCreator}/>
                )
            }
        </div>
    )
})

