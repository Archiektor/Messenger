import {CommonResponseType, instance} from './api';
import {UserType} from '../../redux/users-reducer';

type GetUsersPromiseType = {
    items: Array<UserType>,
    totalCount: 5199,
    error: null
}

export const UserApi = {
    getUsers: async (currentPage: number, pageSize: number): Promise<GetUsersPromiseType> => {
        try {
            const {data} = await instance.get(`users?page=${currentPage}&count=${pageSize}`)
            // debugger;
            return data;
        } catch (e) {
            throw new Error(e);
        }
    },
    unfollowUser: async (userId: string): Promise<CommonResponseType> => {
        try {
            const {data} = await instance.delete(`follow/${userId}`);
            return data;
        } catch (e) {
            throw new Error(e);
        }
    },
    followUser: async (userId: string): Promise<CommonResponseType> => {
        try {
            const {data} = await instance.post(`follow/${userId}`, {});
            return data;
        } catch (e) {
            throw new Error(e);
        }
    },
}